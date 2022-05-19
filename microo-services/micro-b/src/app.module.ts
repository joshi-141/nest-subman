import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { SubscriberService } from './subscriber.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MICRO-A',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8888,
        },
      },
    ])
  ],
  controllers: [AppController],
  providers: [PrismaService, SubscriberService],
})
export class AppModule {}