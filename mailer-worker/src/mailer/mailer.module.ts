import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import {MinioModule} from "../minio/minio.module";

@Module({
  imports: [MinioModule],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
