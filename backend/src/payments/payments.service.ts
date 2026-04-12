import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as https from 'https';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { CreateOrderDto } from './dto/create-order.dto';

// Paytm checksum helper (paytmchecksum package)
// eslint-disable-next-line @typescript-eslint/no-require-imports
const PaytmChecksum = require('paytmchecksum');

const COURSE_AMOUNT_PAISE = 149900; // ₹1,499 in paise

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly email: EmailService,
    private readonly config: ConfigService,
  ) {}

  // ─── Create Paytm Order ──────────────────────────────────────────────────────

  async createOrder(userId: string, dto: CreateOrderDto) {
    const mid = this.config.getOrThrow<string>('PAYTM_MID');
    const merchantKey = this.config.getOrThrow<string>('PAYTM_MERCHANT_KEY');
    const website = this.config.get<string>('PAYTM_WEBSITE') ?? 'WEBSTAGING';
    const channelId = this.config.get<string>('PAYTM_CHANNEL_ID') ?? 'WEB';
    const env = this.config.get<string>('PAYTM_ENV') ?? 'staging';
    const frontendUrl = this.config.get<string>('FRONTEND_URL') ?? 'http://localhost:3000';

    const orderId = `ORD_${userId.slice(0, 8)}_${Date.now()}`;
    const amount = (COURSE_AMOUNT_PAISE / 100).toFixed(2); // "1499.00"

    // Build Paytm params
    const paytmParams: Record<string, unknown> = {
      body: {
        requestType: 'Payment',
        mid,
        websiteName: website,
        orderId,
        callbackUrl: `${frontendUrl}/checkout/status?orderId=${orderId}`,
        txnAmount: { value: amount, currency: 'INR' },
        userInfo: { custId: userId },
      },
    };

    // Generate checksum
    const checksum: string = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      merchantKey,
    );

    paytmParams.head = { signature: checksum };

    // Call Paytm initiateTransaction API
    const paytmHost =
      env === 'production'
        ? 'securegw.paytm.in'
        : 'securegw-stage.paytm.in';

    const txnToken = await this.callPaytmApi(
      paytmHost,
      `/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`,
      paytmParams,
    );

    // Persist pending payment
    await this.prisma.payment.create({
      data: {
        studentId: userId,
        amount: COURSE_AMOUNT_PAISE,
        paytmOrderId: orderId,
        paytmTxnToken: txnToken,
        courseName: dto.courseName,
      },
    });

    return { orderId, txnToken, mid, amount, env };
  }

  // ─── Verify Payment (called by status page polling) ───────────────────────

  async verifyOrder(userId: string, orderId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { paytmOrderId: orderId },
    });

    if (!payment || payment.studentId !== userId) {
      throw new BadRequestException('Order not found');
    }

    if (payment.status === 'COMPLETED') {
      return { status: 'COMPLETED', alreadyGranted: true };
    }

    // Fetch live status from Paytm
    const txnStatus = await this.fetchOrderStatus(orderId);

    if (txnStatus === 'TXN_SUCCESS') {
      await this.prisma.$transaction([
        this.prisma.payment.update({
          where: { paytmOrderId: orderId },
          data: { status: 'COMPLETED' },
        }),
        this.prisma.user.update({
          where: { id: userId },
          data: { paymentStatus: true, paymentDate: new Date() },
        }),
      ]);

      // Send confirmation email asynchronously
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { email: true, name: true },
      });
      if (user) {
        this.email
          .sendPaymentConfirmation(user.email, user.name, payment.courseName, payment.amount, orderId)
          .catch((err: unknown) => this.logger.error('Email send failed', err));
      }

      return { status: 'COMPLETED', alreadyGranted: false };
    }

    if (txnStatus === 'TXN_FAILURE') {
      await this.prisma.payment.update({
        where: { paytmOrderId: orderId },
        data: { status: 'FAILED' },
      });
      return { status: 'FAILED' };
    }

    return { status: 'PENDING' };
  }

  // ─── Paytm Callback (server-to-server POST) ───────────────────────────────

  async handleCallback(body: Record<string, string>) {
    const merchantKey = this.config.getOrThrow<string>('PAYTM_MERCHANT_KEY');

    // Verify checksum
    const receivedChecksum = body.CHECKSUMHASH;
    const paramsCopy = { ...body };
    delete paramsCopy.CHECKSUMHASH;

    const isValid: boolean = await PaytmChecksum.verifySignature(
      paramsCopy,
      merchantKey,
      receivedChecksum,
    );

    if (!isValid) {
      this.logger.warn('Paytm callback: invalid checksum');
      return { ok: false };
    }

    const orderId = body.ORDERID;
    const txnId = body.TXNID;
    const status = body.STATUS; // TXN_SUCCESS | TXN_FAILURE | PENDING

    if (status === 'TXN_SUCCESS') {
      const payment = await this.prisma.payment.findUnique({
        where: { paytmOrderId: orderId },
      });
      if (payment && payment.status !== 'COMPLETED') {
        await this.prisma.$transaction([
          this.prisma.payment.update({
            where: { paytmOrderId: orderId },
            data: { status: 'COMPLETED', paytmTxnId: txnId },
          }),
          this.prisma.user.update({
            where: { id: payment.studentId },
            data: { paymentStatus: true, paymentDate: new Date() },
          }),
        ]);
      }
    } else if (status === 'TXN_FAILURE') {
      await this.prisma.payment.updateMany({
        where: { paytmOrderId: orderId, status: 'PENDING' },
        data: { status: 'FAILED', paytmTxnId: txnId },
      });
    }

    return { ok: true };
  }

  // ─── Private Helpers ─────────────────────────────────────────────────────────

  private async fetchOrderStatus(orderId: string): Promise<string> {
    const mid = this.config.getOrThrow<string>('PAYTM_MID');
    const merchantKey = this.config.getOrThrow<string>('PAYTM_MERCHANT_KEY');
    const env = this.config.get<string>('PAYTM_ENV') ?? 'staging';

    const body = { mid, orderId };
    const checksum: string = await PaytmChecksum.generateSignature(
      JSON.stringify(body),
      merchantKey,
    );

    const paytmParams = { body, head: { signature: checksum } };
    const host =
      env === 'production'
        ? 'securegw.paytm.in'
        : 'securegw-stage.paytm.in';

    const result = await this.callPaytmApi(
      host,
      '/v3/order/status',
      paytmParams,
    );

    return result as string;
  }

  private callPaytmApi(
    host: string,
    path: string,
    payload: unknown,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const post = JSON.stringify(payload);
      const options = {
        hostname: host,
        port: 443,
        path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(post),
        },
      };

      const req = https.request(options, (resp) => {
        let data = '';
        resp.on('data', (chunk: Buffer) => (data += chunk));
        resp.on('end', () => {
          try {
            const parsed = JSON.parse(data) as {
              body?: { txnToken?: string; resultInfo?: { resultStatus?: string } };
            };
            // initiateTransaction returns txnToken; order/status returns resultInfo.resultStatus
            const token = parsed?.body?.txnToken ?? parsed?.body?.resultInfo?.resultStatus;
            resolve(token ?? '');
          } catch {
            reject(new InternalServerErrorException('Paytm API parse error'));
          }
        });
      });

      req.on('error', reject);
      req.write(post);
      req.end();
    });
  }
}
