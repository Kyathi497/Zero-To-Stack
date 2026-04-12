import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
  Throttle,
} from '@nestjs/common';
import { Request } from 'express';
import { PaymentsService } from './payments.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // Create a Paytm order — rate limited to 5 per minute per user
  @Post('create-order')
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { ttl: 60_000, limit: 5 } })
  @HttpCode(HttpStatus.CREATED)
  async createOrder(
    @Body() dto: CreateOrderDto,
    @Req() req: Request & { user: { id: string } },
  ) {
    return this.paymentsService.createOrder(req.user.id, dto);
  }

  // Polling endpoint — frontend calls after redirect from Paytm
  @Get('verify/:orderId')
  @UseGuards(JwtAuthGuard)
  async verifyOrder(
    @Param('orderId') orderId: string,
    @Req() req: Request & { user: { id: string } },
  ) {
    return this.paymentsService.verifyOrder(req.user.id, orderId);
  }

  // Paytm server-to-server callback (no auth guard — Paytm POSTs here)
  @Post('callback')
  @HttpCode(HttpStatus.OK)
  async callback(@Body() body: Record<string, string>) {
    return this.paymentsService.handleCallback(body);
  }
}
