import {Controller} from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import {MailerService} from "../mailer/mailer.service";
import {SendMailDto} from "./dtos/sendMail.dto";
import { TemplateDoesNotExist} from "../mailer/errors";
import {InjectPinoLogger, PinoLogger} from "nestjs-pino";

@Controller('consumer')
export class ConsumerController {
  constructor(
      @InjectPinoLogger(ConsumerController.name)
      private readonly logger: PinoLogger,
      private mailerService: MailerService
  ) {}

  @EventPattern('email')
  async handleMessage(@Payload() data: SendMailDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await this.mailerService.sendMailByTemplate(data);
      channel.ack(originalMsg)
    } catch (error) {
      this.logger.error('Error processing email:', error);

      if (error instanceof TemplateDoesNotExist) {
        channel.ack(originalMsg)
        return;
      }

      channel.nack(originalMsg)
    }
  }
}
