import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {SubscriberService} from './subscriber.service';

@Controller()
export class AppController {

  constructor(
    private readonly subscriberService: SubscriberService,
  ) {}


  @MessagePattern({ cmd: 'create' })
  creatingSubsriber(@Payload() payload : {email:string}){
    return this.subscriberService.createSubscriber({email : payload.email});
  }

  @MessagePattern({cmd: 'update'})
  updatingSubscriber(@Payload() payload: {id:number, email:string}){
    return this.subscriberService.updateSubscriber({email: payload.email}, {id: payload.id});
  }

  @MessagePattern({cmd : 'delete'})
  deletingSubscriber(@Payload() payload: {id:number}){
    return this.subscriberService.deleteSubscriber({id : payload.id});
  }

}