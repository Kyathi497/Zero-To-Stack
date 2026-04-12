import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressController, AdminProgressController } from './progress.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [PrismaModule, EmailModule],
  providers: [ProgressService],
  controllers: [ProgressController, AdminProgressController],
  exports: [ProgressService],
})
export class ProgressModule {}
