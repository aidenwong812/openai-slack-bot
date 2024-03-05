import { DataSource } from 'typeorm';
import * as config from '../config/ormConfig';

const datasource = new DataSource(config);
datasource.initialize();
export default datasource;
