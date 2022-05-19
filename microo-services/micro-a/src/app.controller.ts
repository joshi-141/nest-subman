import { 
  Controller,
} from '@nestjs/common';
import { SubscriberService } from './subscriber.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly subscriberService: SubscriberService,
  ) {}

  @MessagePattern({ cmd: 'micro-a' })
  fetchingData(@Payload() payload) {
    return this.subscriberService.subscriber({ id: Number(payload.id) });
  }
  
}

