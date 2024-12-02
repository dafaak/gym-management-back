import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IdParamDto } from '../../common/dto/idParamDto';
import { MembershipService } from './membership.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { SearchMembershipDto } from './dto/search-membership.dto';

@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Get()
  find(@Query() searchParams: SearchMembershipDto) {
    console.log(searchParams);
    return this.membershipService.find(searchParams);
  }

  @Post()
  create(@Body() createDto: CreateMembershipDto) {
    return this.membershipService.create(createDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(@Param() params: IdParamDto, @Body() updateDto: UpdateMembershipDto) {
    return this.membershipService.update(params.id, updateDto);
  }

  @Delete(':id')
  delete(@Param() params: IdParamDto) {
    return this.membershipService.delete(params.id);
  }
}
