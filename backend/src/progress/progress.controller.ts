import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Request,
  UseGuards,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ProgressService } from './progress.service';
import { EnrollDto } from './dto/enroll.dto';
import { MarkModuleCompleteDto } from './dto/mark-module-complete.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

interface AuthRequest extends Request {
  user: { id: string; email: string; role: string };
}

// ─── Student routes (/progress) ───────────────────────────────────────────────

@Controller('progress')
@UseGuards(JwtAuthGuard)
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post('enroll')
  @HttpCode(HttpStatus.CREATED)
  enroll(@Body() dto: EnrollDto, @Request() req: AuthRequest) {
    return this.progressService.enroll(req.user.id, dto.courseId);
  }

  @Get()
  getAllMyProgress(@Request() req: AuthRequest) {
    return this.progressService.getAllMyProgress(req.user.id);
  }

  @Get(':courseId')
  getMyProgress(@Param('courseId') courseId: string, @Request() req: AuthRequest) {
    return this.progressService.getMyProgress(req.user.id, courseId);
  }
}

// ─── Admin routes (/admin/progress) ──────────────────────────────────────────

@Controller('admin/progress')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminProgressController {
  constructor(private readonly progressService: ProgressService) {}

  // All students platform-wide
  @Get('students')
  getAllStudents() {
    return this.progressService.getAllStudents();
  }

  // CSV export
  @Get('students/export')
  async exportCsv(@Res() res: Response) {
    const csv = await this.progressService.exportStudentsCsv();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="students.csv"');
    res.send(csv);
  }

  // Single student detail
  @Get('students/:studentId')
  getStudentDetail(@Param('studentId') studentId: string) {
    return this.progressService.getStudentDetail(studentId);
  }

  // Students progress for a specific course
  @Get('courses/:courseId')
  getStudentsProgress(@Param('courseId') courseId: string) {
    return this.progressService.getStudentsProgress(courseId);
  }

  // Mark a module complete (triggers recalc + emails)
  @Patch('courses/:courseId/modules/:moduleId/complete')
  @HttpCode(HttpStatus.OK)
  markModuleComplete(
    @Param('courseId') courseId: string,
    @Param('moduleId') moduleId: string,
  ) {
    return this.progressService.markModuleComplete(courseId, moduleId);
  }
}
