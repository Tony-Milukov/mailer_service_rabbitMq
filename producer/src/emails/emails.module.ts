import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { EmailsController } from './emails.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '../jwt/jwt.module';
@Module({
  imports: [
    AuthModule,
    JwtModule,
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
  ],
  providers: [EmailsService],
  controllers: [EmailsController]
})
export class EmailsModule {}
