import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { StripeModule } from '@golevelup/nestjs-stripe';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';

@Module({
  imports: [
    StripeModule.forRootAsync(StripeModule, {
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('STRIPE_CONFIG'),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Payment]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
