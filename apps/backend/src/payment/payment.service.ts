import { Injectable, Logger } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import {
  InjectStripeClient,
  StripeWebhookHandler,
} from '@golevelup/nestjs-stripe';
import Stripe from 'stripe';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { User } from 'users/entities/user.entity';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectStripeClient() private stripe: Stripe,
  ) {}

  @StripeWebhookHandler('customer.subscription.updated')
  async handleSubscriptionUpdate(event: Stripe.Event): Promise<void> {
    try {
      const dataObject = event.data.object as Stripe.Subscription;

      const customer = (await this.stripe.customers.retrieve(
        dataObject.customer.toString(),
      )) as Stripe.Customer;

      let amount = 0;
      dataObject.items.data.map((one) => {
        amount += one.plan.amount;
      });

      const payment = this.paymentRepository.create({
        stripeSubscriptionId: dataObject.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        amount: amount,
      });
      await this.paymentRepository.save(payment);
    } catch (e) {
      this.logger.log(e);
    }
  }

  @StripeWebhookHandler('customer.subscription.deleted')
  async handleSubscriptionDelete(event: Stripe.Event): Promise<void> {
    const dataObject = event.data.object as Stripe.Subscription;
    await this.paymentRepository.delete(dataObject.id);
  }

  async getSubscription(user: User) {
    const payment = await this.paymentRepository.findOneBy({
      email: user.email,
    });

    if (!payment) return null;
    else {
      const subscription = await this.stripe.subscriptions.retrieve(
        payment.id.toString(),
      );
      return {
        payment,
        status: subscription.status,
      };
    }
  }

  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
