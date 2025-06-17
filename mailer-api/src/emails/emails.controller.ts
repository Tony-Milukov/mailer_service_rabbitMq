import {
    Body,
    Controller,
    Post,
    UploadedFiles,
    UseInterceptors
} from '@nestjs/common';
import { EmailsService } from './emails.service';
import { AuthInterceptor } from '../auth/auth.interceptor';
import {FilesInterceptor} from "@nestjs/platform-express";
import {ApiCreatedResponse, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UploadAttachmentsResponse} from "./dtos/uploadAttachments.res.dto";
import {SendMailReqDto} from "./dtos/sendMail.req.dto";

@ApiTags('mailer')
@UseInterceptors(AuthInterceptor)
@Controller('mailer')
export class EmailsController {
  constructor(private emailsService: EmailsService) {}

  @Post("/send")
  async send(@Body() data: SendMailReqDto) {
        await this.emailsService.sendMail(data)
  }
    @Post('upload/attachments')
    @ApiCreatedResponse({type: UploadAttachmentsResponse, description: 'Array of uploaded attachments in S3'})
    @UseInterceptors(FilesInterceptor('files'))
    async uploadAttachments(@UploadedFiles() files: Express.Multer.File[]): Promise<UploadAttachmentsResponse> {
        const attachments = await this.emailsService.uploadAttachments(files);
        return { attachments };
    }
}
