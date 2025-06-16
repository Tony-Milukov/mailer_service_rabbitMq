import { Module } from '@nestjs/common';
import { AttachmentService } from './attachment.service';
import {S3Module} from "../../s3/s3.module";

@Module({
  imports: [S3Module],
  providers: [AttachmentService],
  exports: [AttachmentService],
})
export class AttachmentModule {}
