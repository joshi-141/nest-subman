import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Subscriber, Prisma } from '@prisma/client';

@Injectable()
export class SubscriberService {
  constructor(private prisma: PrismaService) {}

  async subscriber(
    id: Prisma.SubscriberWhereUniqueInput
  ){
    let response: any;
    await this.prisma.subscriber.findUnique({
      where: id,
    })
    .then( d=> {
      response = d;
    })
    .catch( err => {
      console.log("Details are wrong");
    })
    if(!response && response.id !> 0){
      return "Provided Details are wrong";
    }
    let totalCount = await this.prisma.subscriber.count();
    if(response.email){
      response["microservice"] = 'A';
      response["Total Subscriber"] = totalCount;
    };
    return response;
  }

}