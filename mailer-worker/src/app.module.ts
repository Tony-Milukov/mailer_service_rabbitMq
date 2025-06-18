import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { ConsumerModule } from './consumer/consumer.module';
import { MailerModule } from './mailer/mailer.module';
import { PrismaModule } from './prisma/prisma.module';
import {getLoggerConfig} from "./logger.config";
import {LoggerModule} from "nestjs-pino";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot(getLoggerConfig()),
    ConsumerModule,
    MailerModule,
    PrismaModule,
  ]
})
export class AppModule {}
