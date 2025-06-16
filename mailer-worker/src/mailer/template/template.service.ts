import { Injectable } from '@nestjs/common';
import {SendMailDto} from "../../consumer/dtos/sendMail.dto";
import {FileDoesNotExist} from "../errors";
import {S3Service} from "../../s3/s3.service";
import {ConfigService} from "@nestjs/config";
import {AttachmentService} from "../attachment/attachment.service";

@Injectable()
export class TemplateService {
    constructor(
        private s3Service: S3Service,
    ) {}

    async getS3Template(data: SendMailDto) {
        const templateStream = await this.s3Service.getFileByPath(data.emailTemplateS3Path)
        if (!templateStream) {
            throw new FileDoesNotExist()
        }

        const templateBuffer = await this.s3Service.streamToBuffer(templateStream)
        return templateBuffer.toString()
    }

    async getTemplateTxt(data: SendMailDto) {
        if (data.emailTemplatePlain) {
            return data.emailTemplatePlain;
        } else if (data.emailTemplateS3Path) {
            return this.getS3Template(data);
        } else {
            throw new FileDoesNotExist();
        }
    }


}
