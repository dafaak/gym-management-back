import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BranchHoursService } from './branch-hours.service';
import { CreateBranchHoursDto } from './dto/create-branch-hours.dto';
import { UpdateBranchHoursDto } from './dto/update-branch-hours.dto';

@Controller('branch-hours')
export class BranchHoursController {
  constructor(private readonly branchHoursService: BranchHoursService) {}

  @Get()
  findAll() {
    return this.branchHoursService.findAll();
  }

  @Post()
  create(@Body() createDto: CreateBranchHoursDto) {
    return this.branchHoursService.create(createDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateBranchHoursDto) {
    return this.branchHoursService.update(+id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.branchHoursService.delete(+id);
  }
}
