import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AppService } from "./app.service";
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
      {
        name: "MICRO-B",
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: 8889
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}