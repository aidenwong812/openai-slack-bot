import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from './db/database.module';
import { TwilioModule } from './third-party/twilio/twilio.module';
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';
import { OpenAiModule } from './open-ai/open-ai.module';
import { PaymentModule } from './payment/payment.module';
import configs from 'config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configs],
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    PassportModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true, //join(process.cwd(), 'src/schema.gql'),
      playground: false, // Since we use the below plugin for Apollo Sandbox
      plugins: [ApolloServerPluginLandingPageLocalDefault()], // TODO: Disable in prod
      sortSchema: true,
      context: ({ req }) => ({ req }),
    }),
    TwilioModule,
    ConversationModule,
    MessageModule,
    OpenAiModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
