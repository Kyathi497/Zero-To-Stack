import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly client: PrismaClient;

  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set. Create a backend/.env file.');
    }
    const adapter = new PrismaNeon({ connectionString });
    this.client = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);
  }

  get user() { return this.client.user; }
  get students() { return this.client.user; }
  get refreshToken() { return this.client.refreshToken; }
  get payment() { return this.client.payment; }
  get course() { return this.client.course; }
  get module() { return this.client.module; }
  get class() { return this.client.class; }
  get video() { return this.client.video; }
  get videoProgress() { return this.client.videoProgress; }
  get studentProgress() { return this.client.studentProgress; }
  get $transaction() { return this.client.$transaction.bind(this.client); }

  async onModuleInit() {
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
