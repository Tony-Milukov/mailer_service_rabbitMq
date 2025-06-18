import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import {EmailsModule} from "./emails/emails.module";
import { S3Module } from './s3/s3.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerModule } from 'nestjs-pino';
import {getLoggerConfig} from "./logger.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot(getLoggerConfig()),
    EmailsModule,
    AuthModule,
    S3Module,
    PrismaModule,
  ]
})
export class AppModule {}
