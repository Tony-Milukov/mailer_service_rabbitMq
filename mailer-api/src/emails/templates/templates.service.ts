import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {UpdateTemplateReq} from "./dtos/updateTemplateReq";
import {NoIdProvided, TemplateDoesNotExist} from "./errors";
import {CreateTemplate} from "./dtos/createTemplate.req.dto";
import {S3Service} from "../../s3/s3.service";
import {SendMailReq} from "../dtos/sendMail.req";
import {Template} from "./dtos/template";

@Injectable()
export class TemplatesService {
    constructor(
        private prismaService: PrismaService,
        private s3Service: S3Service,
    ) {}

    async createTemplate(data: CreateTemplate) {
        const { name, body } = data;
        return this.prismaService.mailTemplate.create({ data: {name, body} });
    }

    async getTemplateById(id: number) {
        return this.prismaService.mailTemplate.findUnique({ where: { id } });
    }

    async updateTemplate(data: UpdateTemplateReq) {
        const { id, name, body } = data;

        // Ensure the template exists before attempting to update it
        await this.getTemplateOrThrow(id);

        return this.prismaService.mailTemplate.update({
            where: { id },
            data: {name, body},
        });
    }

    async deleteTemplate(id: number) {
        // Ensure the template exists before attempting to delete it
        await this.getTemplateOrThrow(id);
        return this.prismaService.mailTemplate.delete({ where: { id } });
    }

    async getTemplateOrThrow(id: number) {
        if (!id) {
            throw new NoIdProvided();
        }

        const template = await this.getTemplateById(id);
        if (!template) {
            throw new TemplateDoesNotExist();
        }

        return template;
    }

    async getAllTemplates(): Promise<Template[]> {
        return this.prismaService.mailTemplate.findMany();
    }

    async throwIfInvalidTemplate(data: SendMailReq): Promise<void> {
        if (data.emailTemplateId) {
            const template = await this.getTemplateOrThrow(data.emailTemplateId);
            if (!template?.body) throw new TemplateDoesNotExist();
            return;
        }
        if (data.emailTemplatePlain) {
            return;
        }
        if (data.emailTemplateS3Path) {
            await this.checkS3TemplateOrThrow(data.emailTemplateS3Path);
            return;
        }
        throw new TemplateDoesNotExist();
    }

    async checkS3TemplateOrThrow(s3Path: string) {
        if (!s3Path) {
            throw new NoIdProvided();
        }

        const [bucket, key] = this.s3Service.getBucketAndKey(s3Path);
        const templateExists = await this.s3Service.doesFileExist(bucket, key);

        if (!templateExists) {
            throw new TemplateDoesNotExist();
        }
    }
}