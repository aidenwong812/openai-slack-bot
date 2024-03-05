import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';

const connection = process.env.DATABASE_HOST
  ? {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'postgres',
      ssl: {
        ca: process.env.DATABASE_SSL_CERT,
      },
    }
  : {
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'master-19980725',
      database: 'heycoach',
      ssl: false,
    };

const ormConfig: DataSourceOptions = {
  type: 'postgres',
  ...connection,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  // Important: This needs to be set to false before we go
  // to production, at which point we need to use migrations
  synchronize: true,
  migrationsRun:
    process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging',
  logging: true,
  logger: 'file',
  migrations: [__dirname + '/../db/migrations/**/*{.ts,.js}'],
};

export = ormConfig;
