import { MODELS } from '../const/models';
import { Connection } from 'mongoose';
import { DATASOURCES } from '../../config/database/const/datasources';
import { AttendanceSchema } from './attendance.schema';
import { BranchService } from '../branch/branch.service';

export const ATTENDANCE_PROVIDERS = [
  {
    provide: MODELS.attendance,
    useFactory: (connection: Connection) =>
      connection.model('Attendance', AttendanceSchema),
    inject: [DATASOURCES.mongo],
  },
];
