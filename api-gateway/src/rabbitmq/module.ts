import { Module } from '@nestjs/common';
import { RabbitMQController } from './controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [],
  controllers: [RabbitMQController],
  providers: [
    {
      provide: 'RABBITMQ_CONNECTION',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://localhost:5672'],
            queue: 'rabbitmq_queue',
            queueOptions: {
              durable: true,
            },
          },
        });
      },
    },
  ],
})
export class RabbitMQModule {}
