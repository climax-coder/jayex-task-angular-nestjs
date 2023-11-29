import { IsNotEmpty, IsArray, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTicketDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  list: string;

  @IsArray()
  @Type(() => String)
  tags: string[];

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;
}
