import { Connection } from 'mongoose';
import { PaymentSchema } from './payment.schema';
import { DATASOURCES } from '../../config/database/const/datasources';
import { MODELS } from '../const/models';

export const PAYMENT_PROVIDERS = [
  {
    provide: MODELS.payment,
    useFactory: (connection: Connection) =>
      connection.model('Payment', PaymentSchema),
    inject: [DATASOURCES.mongo],
  },
];
