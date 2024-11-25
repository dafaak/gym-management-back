import { DATASOURCES } from './const/datasources';
import { dataSourceMySql } from './datasource-mysql';

export const PROVIDER_MY_SQL_DATA_SOURCE = {
  provide: DATASOURCES.mySql,
  useFactory: async () => {
    const dataSource = dataSourceMySql;

    return dataSource.initialize();
  },
};
