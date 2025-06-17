import { Injectable } from '@nestjs/common';
import {SendMailDto} from "../../consumer/dtos/sendMail.dto";
import {TemplateDoesNotExist} from "../errors";
import {S3Service} from "../../s3/s3.service";
import {PrismaService} from "../../prisma/prisma.service";

@Injectable()
export class TemplatesService {
    constructor(
        private s3Service: S3Service,
        private prismaService: PrismaService,
    ) {}

    async getS3Template(data: SendMailDto) {
        const templateStream = await this.s3Service.getFileByPath(data.emailTemplateS3Path)
        if (!templateStream) {
            throw new TemplateDoesNotExist()
        }

        const templateBuffer = await this.s3Service.streamToBuffer(templateStream)
        return templateBuffer.toString()
    }

    async getDbTemplate(data: SendMailDto) {
        return this.prismaService.mailTemplate.findFirst({where: {id: data.emailTemplateId}})
    }

    async getTemplateTxt(data: SendMailDto) {
        if (data.emailTemplateId) {
            const template = await this.getDbTemplate(data);
            if (template?.body) return template.body;
            throw new TemplateDoesNotExist();
        }
        if (data.emailTemplatePlain) {
            return data.emailTemplatePlain;
        }
        if (data.emailTemplateS3Path) {
            return this.getS3Template(data);
        }
        throw new TemplateDoesNotExist();
    }
}
