import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import {S3Module} from "../s3/s3.module";
import {AttachmentModule} from "./attachment/attachment.module";
import {TemplateModule} from "./template/template.module";

@Module({
  imports: [
    S3Module,
    TemplateModule,
    AttachmentModule
  ],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
