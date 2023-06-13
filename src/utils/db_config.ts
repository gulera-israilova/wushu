import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import {DB_ENTITIES} from './db_entities';

dotenv.config();
export const DB_CONFIG: TypeOrmModuleOptions = {
    type: 'postgres',
    url: 'postgres://dmexduttiucove:d451d2307641b8cf4b7726a121b7969711a6ecd402ca70079df25a553ad30e27@ec2-52-54-200-216.compute-1.amazonaws.com:5432/do9dr5catfl88',
    // host: process.env.DB_HOST,
    // port: +process.env.DB_PORT,
    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    // entities: DB_ENTITIES,
    autoLoadEntities: true,
    synchronize: true,
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    },
};