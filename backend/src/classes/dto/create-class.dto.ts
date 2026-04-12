import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

type ClassStatus = 'SCHEDULED' | 'LIVE' | 'COMPLETED' | 'CANCELLED';

export class CreateClassDto {
  @IsUUID()
  courseId: string;

  @IsUUID()
  @IsOptional()
  moduleId?: string;

  @IsString()
  @MaxLength(200)
  topic: string;

  @IsDateString()
  date: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  meetLink?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  recordingLink?: string;

  @IsEnum(['SCHEDULED', 'LIVE', 'COMPLETED', 'CANCELLED'])
  @IsOptional()
  status?: ClassStatus;
}
