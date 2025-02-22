import {Controller, HttpException, HttpStatus} from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import {MailerService} from "../mailer/mailer.service";
import {SendMailDto} from "./dtos/sendMail.dto";

@Controller('consumer')
export class ConsumerController {
  constructor(private mailerService: MailerService) {}

  @EventPattern('email')
  async handleMessage(@Payload() data: SendMailDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await this.mailerService.sendMailByMinioTemplate(data);
      channel.ack(originalMsg)
    } catch (error) {
      console.log(error)
      channel.nack(originalMsg)
    }
  }
}
