import { DataSource } from 'typeorm';
import * as config from '../ormConfig';

const datasource = new DataSource(config);
datasource.initialize();
export default datasource;
