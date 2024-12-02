import { Inject, Injectable } from '@nestjs/common';
import { CommonService } from '../../common/classes/common-service.service';
import { MemberMembership } from './member-membership.entity';
import { CreateMemberMembershipDto } from './dto/create-member-membership.dto';
import { UpdateMemberMembershipDto } from './dto/update-member-membership.dto';
import { REPOSITORIES } from '../const/repositories';
import { Repository } from 'typeorm';

@Injectable()
export class MemberMembershipService extends CommonService<
  MemberMembership,
  CreateMemberMembershipDto,
  UpdateMemberMembershipDto
> {
  constructor(
    @Inject(REPOSITORIES.memberMembership)
    private memberMembershipRepository: Repository<MemberMembership>,
  ) {
    super(memberMembershipRepository);
  }
}
