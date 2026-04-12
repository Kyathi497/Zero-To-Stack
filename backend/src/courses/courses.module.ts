import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController, AdminCoursesController } from './courses.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CoursesController, AdminCoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
