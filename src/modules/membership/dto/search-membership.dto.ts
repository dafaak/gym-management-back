import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { MEMBERSHIP_STATUS } from '../../../common/const/membership-status';
import { Expose, Type } from 'class-transformer';
import { SearchDto } from '../../../common/dto/search.dto';

export class SearchMembershipDto extends SearchDto {
  @Expose()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @IsIn([MEMBERSHIP_STATUS.unactive, MEMBERSHIP_STATUS.active])
  active?: MEMBERSHIP_STATUS;

  @Expose()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  branchId?: number;
}
