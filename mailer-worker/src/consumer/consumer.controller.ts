import {Controller, HttpException, HttpStatus} from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import {MailerService} from "../mailer/mailer.service";
import {SendMailDto} from "./dtos/sendMail.dto";
import {FileDoesNotExist} from "../mailer/errors";

@Controller('consumer')
export class ConsumerController {
  constructor(private mailerService: MailerService) {}

  @EventPattern('email')
  async handleMessage(@Payload() data: SendMailDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await this.mailerService.sendMailByTemplate(data);
      channel.ack(originalMsg)
    } catch (error) {
      console.log('Error processing email:', error);

      if (error instanceof FileDoesNotExist) {
        channel.ack(originalMsg)
        return;
      }
      channel.nack(originalMsg)
    }
  }
}
