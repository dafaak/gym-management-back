import { Inject, Injectable } from '@nestjs/common';
import { CommonService } from '../../common/classes/common-service.service';
import { Membership } from './membership.entity';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { REPOSITORIES } from '../const/repositories';
import { Repository } from 'typeorm';
import { SearchMembershipDto } from './dto/search-membership.dto';

@Injectable()
export class MembershipService extends CommonService<
  Membership,
  CreateMembershipDto,
  UpdateMembershipDto
> {
  constructor(
    @Inject(REPOSITORIES.membership)
    private membershipRepository: Repository<Membership>,
  ) {
    super(membershipRepository);
  }

  async find(searchParams: SearchMembershipDto) {
    const qb = this.membershipRepository.createQueryBuilder('membership');
    if (searchParams.id) {
      qb.andWhere('(membership.id=:id)', { id: searchParams.id });
    }

    if (Number.isInteger(searchParams.active)) {
      qb.andWhere('(membership.active=:active)', {
        active: searchParams.active,
      });
    }

    if (searchParams.branchId) {
      qb.andWhere('(membership.branch=:branchId)', {
        branchId: searchParams.branchId,
      });
    }

    return qb.getMany();
  }
}
