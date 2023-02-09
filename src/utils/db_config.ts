import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import {DB_ENTITIES} from './db_entities';

dotenv.config();
export const DB_CONFIG: TypeOrmModuleOptions = {
    type: 'postgres',
          url: 'postgres://jhesnkqlelplnu:1c119b523cc398777b7d3360c1d86dbf131ab2af8ba41213d29e01ec2ea013fd@ec2-3-229-161-70.compute-1.amazonaws.com:5432/d92gsj3333luu9',
//     host: process.env.DB_HOST,
//     port: +process.env.DB_PORT,
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
    entities: DB_ENTITIES,
    autoLoadEntities: true,
    synchronize: true,
    ssl: {
        rejectUnauthorized: false
    }
};
