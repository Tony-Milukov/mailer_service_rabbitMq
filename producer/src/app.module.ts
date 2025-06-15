import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import {EmailsModule} from "./emails/emails.module";
import { MinioModule } from './minio/minio.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EmailsModule,
    AuthModule,
    MinioModule,
  ]
})
export class AppModule {}
