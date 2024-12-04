import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
  port: env.get('PORT').required(true).asPortNumber(),
  dbName: env.get('DB_NAME').required(true).asString(),
  dbUser: env.get('DB_USER').required(true).asString(),
  dbPass: env.get('DB_PASS').required(true).asString(),
  dbPort: env.get('DB_PORT').required(true).asPortNumber(),
  dbHost: env.get('DB_HOST').required(true).asString(),
  dbSync: env.get('DB_SYNC').required(true).asBool(),
  dbDropSchema: env.get('DB_DROP_SCHEMA').required(true).asBool(),
  jwtSeed: env.get('JWT_SEED').required(true).asString(),
  cryptoSeed: env.get('CRYPTO_SEED').required(true).asString(),
  redisHost: env.get('REDIS_HOST').required(true).asString(),
  redisPort: env.get('REDIS_PORT').required(true).asPortNumber(),
  mongoUrl: env.get('MONGO_URL').required(true).asString(),
};
