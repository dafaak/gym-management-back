import { DataSource } from 'typeorm';
import { envs } from '../envs';
import { ENTITIES } from '../../modules/const/entities';

export const dataSourceMySql = new DataSource({
  type: 'mysql',
  host: envs.dbHost,
  port: envs.dbPort,
  username: envs.dbUser,
  password: envs.dbPass,
  database: envs.dbName,
  entities: [...ENTITIES],
  synchronize: envs.dbSync,
  dropSchema: envs.dbDropSchema,
});
