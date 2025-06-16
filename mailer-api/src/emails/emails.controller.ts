import {
    Body,
    Controller,
    Post,
    UploadedFiles,
    UseInterceptors
} from '@nestjs/common';
import { SendMailDto } from './dtos/sendMail.dto';
import { EmailsService } from './emails.service';
import { AuthInterceptor } from '../auth/auth.interceptor';
import {FilesInterceptor} from "@nestjs/platform-express";

@UseInterceptors(AuthInterceptor)
@Controller('mailer')
export class EmailsController {
  constructor(private emailsService: EmailsService) {}

  @Post("/send")
  async send(@Body() data: SendMailDto) {
        await this.emailsService.sendMail(data)
  }

    @Post('upload/attachments')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadAttachments(@UploadedFiles() files: Express.Multer.File[]) {
        const urls = await this.emailsService.uploadAttachments(files);
        return { urls };
    }
}
