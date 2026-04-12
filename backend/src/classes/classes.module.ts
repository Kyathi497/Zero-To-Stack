import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController, AdminClassesController } from './classes.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [PrismaModule, EmailModule],
  controllers: [ClassesController, AdminClassesController],
  providers: [ClassesService],
  exports: [ClassesService],
})
export class ClassesModule {}
