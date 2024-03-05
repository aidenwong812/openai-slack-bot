import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { rawBody: true },
  );

  const isProdOrStaging =
    process.env.NODE_ENV == 'production' || process.env.NODE_ENV === 'staging';

  const config = new DocumentBuilder()
    .setTitle('Hey Coach')
    .setDescription('The Coach API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  const address = isProdOrStaging ? '0.0.0.0' : '';

  await app.listen(process.env.PORT || 3001, address);

  if (isProdOrStaging) {
    console.log('Running on port: ', process.env.PORT);
  } else {
    console.log('GraphQL Server available at http://localhost:3001/graphql');
  }
}
bootstrap();
