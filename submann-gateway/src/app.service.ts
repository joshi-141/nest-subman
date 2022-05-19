import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs/operators";

@Injectable()
export class AppService {
  constructor(
    @Inject('MICRO-A') private readonly clientServiceA: ClientProxy,
    @Inject("MICRO-B") private readonly clientServiceB: ClientProxy,
  ) {}

  pingServiceA(id:number) {
    const pattern = { cmd: "micro-a" };
    const payload = {id : id};
    return this.clientServiceA
      .send<string>(pattern, payload)
      .pipe();
  }


  pingServiceB(data:Object, action:String) {
    let pattern:Object;
    if(action=="create"){
      pattern = { cmd: 'create' };
    }else if(action == "update"){
      pattern = {cmd : 'update'};
    }else if(action == "delete"){
      pattern = {cmd : 'delete'}
    }
    const payload = data;
    return this.clientServiceB
      .send<string>(pattern, payload)
      .pipe();
  }
}