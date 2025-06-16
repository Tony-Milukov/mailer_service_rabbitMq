import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import {S3Module} from "../../s3/s3.module";

@Module({
  imports: [S3Module],
  providers: [TemplateService],
  exports: [TemplateService],
})
export class TemplateModule {}
