import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateModuleDto {
  @IsInt()
  @Min(1)
  moduleNumber: number;

  @IsString()
  @MaxLength(200)
  title: string;

  @IsString()
  @MaxLength(2000)
  description: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  estimatedHours?: number;
}
