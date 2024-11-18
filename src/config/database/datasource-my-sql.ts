import { DataSource } from 'typeorm';
import { envs } from '../envs';
import { ENTITIES } from '../../modules/entities';

export const My_SQL_DATA_SOURCE = {
  provide: 'DATA_SOURCE',
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
