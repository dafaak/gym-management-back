import { Inject, Injectable } from '@nestjs/common';
import { CommonService } from '../../common/classes/common-service.service';
import { Member } from './member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { REPOSITORIES } from '../const/repositories';
import { Repository } from 'typeorm';
import { Branch } from '../branch/branch.entity';

@Injectable()
export class MemberService extends CommonService<
  Member,
  CreateMemberDto,
  UpdateMemberDto
> {
  constructor(
    @Inject(REPOSITORIES.member)
    public readonly memberRepository: Repository<Member>,
  ) {
    super(memberRepository);
  }

  async findById(id: number): Promise<Member | null> {
    if (!id) {
      return null;
    }
    return await this.repository.findOne({ where: { id } });
  }
}
