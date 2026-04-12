import { IsDateString, IsInt, IsString, MaxLength, Min } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @MaxLength(200)
  courseName: string;

  @IsString()
  @MaxLength(2000)
  description: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsInt()
  @Min(1)
  totalModules: number;
}
