import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Subscriber, Prisma } from '@prisma/client';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class SubscriberService {
  constructor(
    private prisma: PrismaService,
    @Inject('MICRO-A') private readonly clientServiceA: ClientProxy,
  ) {}

  async createSubscriber(
    data: Prisma.SubscriberCreateInput
  ){
    let response = {id : 0};
    await this.prisma.subscriber.create({
      data,
    })
    .then( d=> {
      response = d;
    })
    .catch( err => {
      console.log('Subsciber details are insufficient to create new');
    })
    let id: number;
    if(response && response.id>0){
      id = Number(response.id);
    }else{
      return "Insuficient Details";
    }
    let pattern = { cmd: "micro-a" };
    let payload = {id : id};
    return this.clientServiceA
      .send<string>(pattern, payload)
      .pipe()
  }

  async updateSubscriber(
    data: Prisma.SubscriberCreateInput, id : Prisma.SubscriberWhereUniqueInput
  ){
    
    let response = {id : 0};
    await this.prisma.subscriber.update({
      where : {id : Number(id.id)},
      data : data
    })
    .then( d=> {
      // console.log('Update Successfull',d);
      response = d;
    })
    .catch( err => {
      console.log('Error occured while updating');
    })
    let updatedId: number;
    if(response && response.id>1)
    updatedId = Number(response.id);
    else{
      return "Item does not Exist";
    }
    let pattern = { cmd: "micro-a" };
    let payload = {id : updatedId};
    return this.clientServiceA
      .send<string>(pattern, payload)
      .pipe()
  }

  async deleteSubscriber(
    id: Prisma.SubscriberWhereUniqueInput
  ){
    let response = {id:0};
    await this.prisma.subscriber.delete({
      where : {id : Number(id.id)},
    })
    .then( d=> {
      response = d;
    })
    .catch( err => {
      console.log('Error occured while deleting');
    })
    let deletedId = response.id;
    if(response.id>0)
    response['message'] = 'Item Deleted Successfully';
    else response['message'] = 'User does not exist';
    let pattern = {cmd : "micro-a"};
    let payload = {id : deletedId};
    return response;
  }

}