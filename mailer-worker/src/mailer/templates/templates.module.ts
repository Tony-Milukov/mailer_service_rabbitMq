import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import {S3Module} from "../../s3/s3.module";
import {PrismaModule} from "../../prisma/prisma.module";

@Module({
  imports: [S3Module, PrismaModule],
  providers: [TemplatesService],
  exports: [TemplatesService],
})
export class TemplatesModule {}
