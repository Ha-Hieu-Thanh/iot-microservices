import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const mqttMicroservice = app.connectMicroservice({
    transport: Transport.MQTT,
    options: {
      url: 'tcp://localhost:1883',
    },
  });

  const rabbitmqService = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'rabbitmq_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(3001);
}
bootstrap();
