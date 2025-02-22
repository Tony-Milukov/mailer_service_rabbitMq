import { Module } from '@nestjs/common';
import { ConsumerController } from './consumer.controller';
import {MailerModule} from "../mailer/mailer.module";

@Module({
  imports: [MailerModule],
  controllers: [ConsumerController]
})
export class ConsumerModule {}
