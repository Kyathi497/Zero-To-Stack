import { IsUUID } from 'class-validator';

export class MarkModuleCompleteDto {
  @IsUUID()
  moduleId!: string;
}
