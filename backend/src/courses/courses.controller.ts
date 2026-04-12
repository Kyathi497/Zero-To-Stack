import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

interface AuthRequest extends Request {
  user: { id: string; email: string; role: string };
}

// ─── Admin: Course management (/admin/courses) ────────────────────────────────

@Controller('admin/courses')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminCoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  createCourse(@Body() dto: CreateCourseDto, @Request() req: AuthRequest) {
    return this.coursesService.createCourse(dto, req.user.id);
  }

  @Get()
  findAllCourses() {
    return this.coursesService.findAllCourses();
  }

  @Get(':id')
  findOneCourse(@Param('id') id: string) {
    return this.coursesService.findOneCourse(id);
  }

  @Patch(':id')
  updateCourse(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.coursesService.updateCourse(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteCourse(@Param('id') id: string) {
    return this.coursesService.deleteCourse(id);
  }

  // ─── Modules ───────────────────────────────────────────────────────────────

  @Post(':courseId/modules')
  createModule(@Param('courseId') courseId: string, @Body() dto: CreateModuleDto) {
    return this.coursesService.createModule(courseId, dto);
  }

  @Get(':courseId/modules')
  findModules(@Param('courseId') courseId: string) {
    return this.coursesService.findModules(courseId);
  }

  @Patch(':courseId/modules/:moduleId')
  updateModule(
    @Param('courseId') courseId: string,
    @Param('moduleId') moduleId: string,
    @Body() dto: UpdateModuleDto,
  ) {
    return this.coursesService.updateModule(courseId, moduleId, dto);
  }

  @Delete(':courseId/modules/:moduleId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteModule(@Param('courseId') courseId: string, @Param('moduleId') moduleId: string) {
    return this.coursesService.deleteModule(courseId, moduleId);
  }
}

// ─── Student: read-only (/courses) ────────────────────────────────────────────

@Controller('courses')
@UseGuards(JwtAuthGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAllCourses() {
    return this.coursesService.findAllCourses();
  }

  @Get(':id')
  findOneCourse(@Param('id') id: string) {
    return this.coursesService.findOneCourse(id);
  }

  @Get(':courseId/modules')
  findModules(@Param('courseId') courseId: string) {
    return this.coursesService.findModules(courseId);
  }
}
