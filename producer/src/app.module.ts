import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import {EmailsModule} from "./emails/emails.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EmailsModule,
    AuthModule,
  ]
})
export class AppModule {}
