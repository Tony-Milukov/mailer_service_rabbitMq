import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { EmailsController } from './emails.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '../jwt/jwt.module';
import {S3Module} from "../s3/s3.module";
import { TemplateModule } from './template/template.module';
@Module({
  imports: [
    AuthModule,
    JwtModule,
      S3Module,
    ClientsModule.registerAsync([
      {
        name: 'MAILS',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBIT_MQ_URL')],
            queue: configService.get<string>('RABBIT_MQ_QUEUE'),
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
    TemplateModule,
  ],
  providers: [EmailsService],
  controllers: [EmailsController]
})
export class EmailsModule {}
