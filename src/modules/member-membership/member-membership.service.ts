import { Inject, Injectable } from '@nestjs/common';
import { CommonService } from '../../common/classes/common-service.service';
import { MemberMembership } from './member-membership.entity';
import { CreateMemberMembershipDto } from './dto/create-member-membership.dto';
import { UpdateMemberMembershipDto } from './dto/update-member-membership.dto';
import { REPOSITORIES } from '../const/repositories';
import { Repository } from 'typeorm';
import { SearchMemberMembershipDto } from './dto/search-member-membership.dto';

@Injectable()
export class MemberMembershipService extends CommonService<
  MemberMembership,
  CreateMemberMembershipDto,
  UpdateMemberMembershipDto
> {
  constructor(
    @Inject(REPOSITORIES.memberMembership)
    public memberMembershipRepository: Repository<MemberMembership>,
  ) {
    super(memberMembershipRepository);
  }

  async findByParams(searchParams: SearchMemberMembershipDto) {
    const qb =
      this.memberMembershipRepository.createQueryBuilder('memberMembership');
    if (searchParams.id) {
      qb.andWhere('(memberMembership.id=:id)', { id: searchParams.id });
    }

    if (searchParams.memberId) {
      qb.leftJoin('memberMembership.member', 'member');
    }

    return qb.getMany();
  }
}
