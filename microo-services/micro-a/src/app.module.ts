import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SubscriberService } from './subscriber.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [SubscriberService, PrismaService],
})
export class AppModule {}