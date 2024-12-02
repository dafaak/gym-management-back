import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IdParamDto } from '../../common/dto/idParamDto';
import { MemberMembershipService } from './member-membership.service';
import { CreateMemberMembershipDto } from './dto/create-member-membership.dto';
import { UpdateMemberMembershipDto } from './dto/update-member-membership.dto';

@Controller('member-membership')
export class MemberMembershipController {
  constructor(
    private readonly memberMembershipService: MemberMembershipService,
  ) {}
  @Get()
  findAll() {
    return this.memberMembershipService.findAll();
  }

  @Post()
  create(@Body() createDto: CreateMemberMembershipDto) {
    return this.memberMembershipService.create(createDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param() params: IdParamDto,
    @Body() updateDto: UpdateMemberMembershipDto,
  ) {
    return this.memberMembershipService.update(params.id, updateDto);
  }

  @Delete(':id')
  delete(@Param() params: IdParamDto) {
    return this.memberMembershipService.delete(params.id);
  }
}
