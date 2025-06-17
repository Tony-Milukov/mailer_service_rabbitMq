import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import {S3Module} from "../s3/s3.module";
import {AttachmentsModule} from "./attachments/attachments.module";
import {TemplatesModule} from "./templates/templates.module";

@Module({
  imports: [
    S3Module,
    TemplatesModule,
    AttachmentsModule
  ],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
