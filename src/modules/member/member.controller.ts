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
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { IdParamDto } from '../../common/dto/idParamDto';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  findAll() {
    return this.memberService.findAll();
  }

  @Post()
  // @UseInterceptors(FileInterceptor('memberPicture'))
  create(
    @Body() createDto: CreateMemberDto,
    // @UploadedFile() file: Express.Multer.File,
  ) {
    return this.memberService.create(createDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(@Param() params: IdParamDto, @Body() updateDto: UpdateMemberDto) {
    return this.memberService.update(params.id, updateDto);
  }

  @Delete(':id')
  delete(@Param() params: IdParamDto) {
    return this.memberService.delete(params.id);
  }
}
