import { Module } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import {S3Module} from "../../s3/s3.module";

@Module({
  imports: [S3Module],
  providers: [AttachmentsService],
  exports: [AttachmentsService],
})
export class AttachmentsModule {}
