import { Controller, Get, Post, Put, Param, Body, Delete } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/:id")
  pingServiceA(@Param('id') id : number) {
    return this.appService.pingServiceA(id);
  }

  @Post('/')
  createSubs(
    @Body() subscriberData : {email: string}
  ) {
    return this.appService.pingServiceB(subscriberData,'create');
  }

  @Put('/')
  updateSubs(
    @Body() subscriberData : {email: string,id:number}
  ) {
    return this.appService.pingServiceB(subscriberData,'update');
  }

  @Delete('/')
  deleteSubs(
    @Body() subscriberData : {email: string|null,id:number}
  ) {
    return this.appService.pingServiceB(subscriberData,'delete');
  }
  
}