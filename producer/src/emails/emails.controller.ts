import { Body, Controller, HttpException, HttpStatus, Inject, Post, UseInterceptors } from '@nestjs/common';
import { SendMailDto } from './dtos/sendMail.dto';
import {ClientProxy} from "@nestjs/microservices"
import { EmailsService } from './emails.service';
import { AuthInterceptor } from '../auth/auth.interceptor';

@UseInterceptors(AuthInterceptor)
@Controller('mailer')
export class EmailsController {
  constructor(private transactions: EmailsService) {}
  @Post("/send")
  async send(@Body() data: SendMailDto) {
        this.transactions.sendMail(data)
        return {
            message: "Mail sent"
        }
  }
}
