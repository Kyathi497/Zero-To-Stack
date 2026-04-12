import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private readonly resend: Resend;
  private readonly from: string;
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly config: ConfigService) {
    this.resend = new Resend(config.get<string>('RESEND_API_KEY'));
    this.from = config.get<string>('EMAIL_FROM') ?? 'StackForge <noreply@stackforge.dev>';
  }

  async sendPaymentConfirmation(
    to: string,
    name: string,
    courseName: string,
    amountPaise: number,
    orderId: string,
  ) {
    const amount = (amountPaise / 100).toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
    });

    await this.resend.emails.send({
      from: this.from,
      to,
      subject: `Payment Confirmed — Welcome to ${courseName}!`,
      html: `
        <h2>Hi ${name},</h2>
        <p>Your payment of <strong>${amount}</strong> for <strong>${courseName}</strong> has been confirmed.</p>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p>You now have full access to all course materials, live sessions, and recordings.</p>
        <br/>
        <a href="${this.config.get('FRONTEND_URL')}/dashboard" style="background:#fa5c1b;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">
          Go to Dashboard
        </a>
        <br/><br/>
        <p>— The StackForge Team</p>
      `,
    });
  }

  async sendWelcome(to: string, name: string) {
    await this.resend.emails.send({
      from: this.from,
      to,
      subject: 'Welcome to StackForge!',
      html: `
        <h2>Hi ${name}, welcome to StackForge!</h2>
        <p>Your account has been created. Complete your enrollment by making a payment to access all course content.</p>
        <a href="${this.config.get('FRONTEND_URL')}/checkout" style="background:#fa5c1b;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">
          Enroll Now
        </a>
      `,
    });
  }

  async sendClassReminder(
    to: string,
    name: string,
    topic: string,
    meetLink: string,
    startTime: Date,
  ) {
    const time = startTime.toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    await this.resend.emails.send({
      from: this.from,
      to,
      subject: `Class Reminder: ${topic} starts in 15 minutes`,
      html: `
        <h2>Hi ${name},</h2>
        <p>Your class <strong>${topic}</strong> starts at <strong>${time}</strong>.</p>
        <a href="${meetLink}" style="background:#fa5c1b;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">
          Join Google Meet
        </a>
        <p style="color:#888;font-size:12px;">Do not share this link. It is personal to your account.</p>
      `,
    });
  }

  async sendModuleCompletionNotification(
    to: string,
    name: string,
    moduleName: string,
    newPercentage: number,
  ) {
    await this.resend.emails.send({
      from: this.from,
      to,
      subject: `Module Completed: ${moduleName}`,
      html: `
        <h2>Hi ${name},</h2>
        <p>Great news! <strong>${moduleName}</strong> has been marked as completed by your instructor.</p>
        <p>Your overall progress is now <strong>${newPercentage.toFixed(0)}%</strong>.</p>
        <a href="${this.config.get('FRONTEND_URL')}/dashboard" style="background:#fa5c1b;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">
          View Progress
        </a>
      `,
    });
  }

  async sendReEngagement(to: string, name: string) {
    await this.resend.emails.send({
      from: this.from,
      to,
      subject: "We miss you, ${name}! 👋",
      html: `
        <h2>Hi ${name},</h2>
        <p>You haven't been active in a while. Your learning streak is waiting!</p>
        <a href="${this.config.get('FRONTEND_URL')}/dashboard" style="background:#fa5c1b;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">
          Resume Learning
        </a>
      `,
    });
  }
}
