import { DataSource } from 'typeorm';
import { envs } from '../envs';
import { ENTITIES } from '../../modules/const/entities';
import { DATASOURCES } from './const/datasources';

export const My_SQL_DATA_SOURCE = {
  provide: DATASOURCES.mySql,
  useFactory: async () => {
    const dataSource = new DataSource({
      type: 'mysql',
      host: envs.dbHost,
      port: envs.dbPort,
      username: envs.dbUser,
      password: envs.dbPass,
      database: envs.dbName,
      entities: [...ENTITIES],
      synchronize: envs.dbSync,
    });

    return dataSource.initialize();
  },
};
