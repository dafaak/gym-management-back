import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { IdParamDto } from '../../common/dto/idParamDto';
import { UpdateGymDto } from '../gym/dto/update-gym.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { ResponseMessageInterface } from '../../common/interface/response-message.interface';

@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Get()
  findAll() {
    return this.branchService.findAll();
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchService.create(createBranchDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Param() params: IdParamDto,
    @Body() updateBranchDto: UpdateBranchDto,
  ) {
    return this.branchService.update(+params.id, updateBranchDto);
  }

  @Delete(':id')
  async delete(@Param() params: IdParamDto) {
    return this.branchService.delete(params.id);
  }
}
