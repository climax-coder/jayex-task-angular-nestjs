import { IsOptional, IsArray, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTicketDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  list?: string;

  @IsArray()
  @Type(() => String)
  @IsOptional()
  tags?: string[];

  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  @IsOptional()
  endDate?: Date;
}
