import { SearchDto } from '../../../common/dto/search.dto';
import { IsNumber, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class SearchMemberMembershipDto extends SearchDto {
  @Expose()
  @IsNumber()
  @IsOptional()
  memberId: number;
}
