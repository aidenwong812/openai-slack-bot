import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormConfig from '../ormConfig';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return ormConfig;
      },
    }),
  ],
})
export class DatabaseModule {}
