import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Transport, Payload, Ctx } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('rabbitmq_event', Transport.RMQ, { queue: 'rabbitmq_queue' })
  async handleRabbitMQEvent(@Payload() data: any, @Ctx() context: any) {
    console.log('[RABBITMQ_EVENT]', data);
  }

  @EventPattern('mqtt_event', Transport.MQTT)
  async handleMQTTEvent(@Payload() data: any, @Ctx() context: any) {
    console.log('[MQTT_EVENT]', data);
  }
}
