import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { AttendanceService } from './attendance.service';
import { RegisterAttendanceDto } from './dto/register-attendance.dto';
import { SearchAttendanceDto } from './dto/search-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {
  }

  @Post('register')
  async registerAttendance(@Body() attendance: RegisterAttendanceDto) {
    return this.attendanceService.registerAttendance(attendance);
  }

  @Get()
  async findByParams(@Query() searchParams: SearchAttendanceDto) {
    console.log(searchParams);
    return this.attendanceService.findByParams(searchParams);
  }
}
