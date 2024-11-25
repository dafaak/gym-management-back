import { Inject, Injectable } from '@nestjs/common';
import { CommonService } from '../../common/classes/common-service.service';
import { Membership } from './membership.entity';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { REPOSITORIES } from '../const/repositories';
import { Repository } from 'typeorm';

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
}
