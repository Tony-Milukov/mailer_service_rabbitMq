import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { ConsumerModule } from './consumer/consumer.module';
import { MailerModule } from './mailer/mailer.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConsumerModule,
    MailerModule,
  ]
})
export class AppModule {}
