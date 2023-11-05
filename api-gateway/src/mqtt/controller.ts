import {
  Controller,
  Inject,
  Post,
  Body,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('mqtt')
export class MqttController {
  constructor(
    @Inject('MQTT_CONNECTION') private readonly client: ClientProxy,
  ) {}

  @Post()
  async publish(@Body() data: any) {
    try {
      console.log('run mqtt');
      return this.client.emit<any>('mqtt_event', data);
    } catch (e) {
      console.log(e);
    }
  }
}
