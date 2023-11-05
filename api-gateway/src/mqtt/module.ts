import { Module } from '@nestjs/common';
import { MqttController } from './controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [],
  controllers: [MqttController],
  providers: [
    {
      provide: 'MQTT_CONNECTION',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.MQTT,
          options: {
            host: 'localhost',
            port: 1883,
          },
        });
      },
    },
  ],
})
export class MqttModule {}
