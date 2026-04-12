import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

interface AuthRequest extends Request {
  user: { id: string; email: string; role: string };
}

// ─── Admin routes (/admin/classes) ──────────────────────────────────────────

@Controller('admin/classes')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  create(@Body() dto: CreateClassDto) {
    return this.classesService.create(dto);
  }

  @Get()
  findAll(@Query('courseId') courseId?: string) {
    return this.classesService.findAll(courseId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateClassDto) {
    return this.classesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.classesService.remove(id);
  }
}

// ─── Student routes (/classes) ───────────────────────────────────────────────

@Controller('classes')
@UseGuards(JwtAuthGuard)
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  findAll(@Request() req: AuthRequest, @Query('courseId') courseId?: string) {
    return this.classesService.findForStudent(req.user.id, courseId);
  }

  @Get(':id/meet-link')
  getMeetLink(@Param('id') id: string, @Request() req: AuthRequest) {
    return this.classesService.getMeetLink(id, req.user.id);
  }
}
