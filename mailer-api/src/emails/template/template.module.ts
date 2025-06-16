import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import {PrismaModule} from "../../prisma/prisma.module";
import {S3Module} from "../../s3/s3.module";

@Module({
  imports: [PrismaModule, S3Module],
  providers: [TemplateService],
  controllers: [TemplateController],
  exports: [TemplateService]
})
export class TemplateModule {}
