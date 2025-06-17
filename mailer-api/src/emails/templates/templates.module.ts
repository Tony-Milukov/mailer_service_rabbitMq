import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';
import {PrismaModule} from "../../prisma/prisma.module";
import {S3Module} from "../../s3/s3.module";
import {AuthModule} from "../../auth/auth.module";
import {JwtModule} from "../../jwt/jwt.module";

@Module({
  imports: [PrismaModule, S3Module,   AuthModule, JwtModule],
  providers: [TemplatesService],
  controllers: [TemplatesController],
  exports: [TemplatesService]
})
export class TemplatesModule {}
