import { MODELS } from '../const/models';
import { Connection } from 'mongoose';
import { DATASOURCES } from '../../config/database/const/datasources';
import { AttendanceSchema } from './attendance.schema';

export const ATTENDANCE_PROVIDERS = [
  {
    provide: MODELS.attendance,
    useFactory: (connection: Connection) =>
      connection.model('Attendance', AttendanceSchema),
    inject: [DATASOURCES.mongo],
  },
];
