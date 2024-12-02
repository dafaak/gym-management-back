import { DATASOURCES } from './const/datasources';
import * as mongoose from 'mongoose';
import { envs } from '../envs';

export const PROVIDER_MONGO = {
  provide: DATASOURCES.mongo,
  useFactory: (): Promise<typeof mongoose> => mongoose.connect(envs.mongoUrl),
};
