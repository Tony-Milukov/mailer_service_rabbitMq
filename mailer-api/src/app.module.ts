import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import {EmailsModule} from "./emails/emails.module";
import { S3Module } from './s3/s3.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EmailsModule,
    AuthModule,
    S3Module,
  ]
})
export class AppModule {}
