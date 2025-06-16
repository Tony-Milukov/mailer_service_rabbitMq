import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { ConsumerModule } from './consumer/consumer.module';
import { MailerModule } from './mailer/mailer.module';
import { PrismaModule } from './prisma/prisma.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConsumerModule,
    MailerModule,
    PrismaModule,
  ]
})
export class AppModule {}
