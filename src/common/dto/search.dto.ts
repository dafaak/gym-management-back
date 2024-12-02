import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class SearchDto {
  @Expose()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id?: number;
}
