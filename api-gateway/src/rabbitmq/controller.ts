import {
  Controller,
  Inject,
  OnApplicationBootstrap,
  Post,
  Body,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('rabbitmq')
export class RabbitMQController {
  constructor(
    @Inject('RABBITMQ_CONNECTION') private readonly client: ClientProxy,
  ) {}

  @Post()
  async publish(@Body() data: any) {
    try {
      console.log('run');
      return this.client.emit<any>('rabbitmq_event', data);
    } catch (e) {
      console.log(e);
    }
  }
}
