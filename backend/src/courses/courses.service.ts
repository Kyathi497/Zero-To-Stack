import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Courses ───────────────────────────────────────────────────────────────

  async createCourse(dto: CreateCourseDto, createdBy: string) {
    return this.prisma.course.create({
      data: {
        courseName: dto.courseName,
        description: dto.description,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        totalModules: dto.totalModules,
        createdBy,
      },
    });
  }

  async findAllCourses() {
    return this.prisma.course.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { modules: true, classes: true } },
      },
    });
  }

  async findOneCourse(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        modules: { orderBy: { moduleNumber: 'asc' } },
        _count: { select: { classes: true } },
      },
    });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async updateCourse(id: string, dto: UpdateCourseDto) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) throw new NotFoundException('Course not found');

    const data: Record<string, unknown> = { ...dto };
    if (dto.startDate) data['startDate'] = new Date(dto.startDate);
    if (dto.endDate) data['endDate'] = new Date(dto.endDate);

    return this.prisma.course.update({ where: { id }, data });
  }

  async deleteCourse(id: string) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) throw new NotFoundException('Course not found');
    await this.prisma.course.delete({ where: { id } });
  }

  // ─── Modules ───────────────────────────────────────────────────────────────

  async createModule(courseId: string, dto: CreateModuleDto) {
    const course = await this.prisma.course.findUnique({ where: { id: courseId } });
    if (!course) throw new NotFoundException('Course not found');

    return this.prisma.module.create({
      data: {
        courseId,
        moduleNumber: dto.moduleNumber,
        title: dto.title,
        description: dto.description,
        estimatedHours: dto.estimatedHours ?? 0,
      },
    });
  }

  async findModules(courseId: string) {
    const course = await this.prisma.course.findUnique({ where: { id: courseId } });
    if (!course) throw new NotFoundException('Course not found');

    return this.prisma.module.findMany({
      where: { courseId },
      orderBy: { moduleNumber: 'asc' },
    });
  }

  async updateModule(courseId: string, moduleId: string, dto: UpdateModuleDto) {
    const mod = await this.prisma.module.findFirst({ where: { id: moduleId, courseId } });
    if (!mod) throw new NotFoundException('Module not found');

    return this.prisma.module.update({ where: { id: moduleId }, data: dto });
  }

  async deleteModule(courseId: string, moduleId: string) {
    const mod = await this.prisma.module.findFirst({ where: { id: moduleId, courseId } });
    if (!mod) throw new NotFoundException('Module not found');
    await this.prisma.module.delete({ where: { id: moduleId } });
  }
}
