import { Inject, Injectable, OnModuleInit} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {SendMailDto} from "./dtos/sendMail.dto";

@Injectable()
export class EmailsService implements OnModuleInit{
  constructor(@Inject("MAILS") private rabbitMq: ClientProxy) {}

  async onModuleInit() {
   try {
     await this.rabbitMq.connect();
   } catch (e) {
      console.error(e)
   }
  }

  sendMail(data: SendMailDto) {
    this.rabbitMq.emit("email", data)
  }
}
