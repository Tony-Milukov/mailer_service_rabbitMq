import {Injectable, OnModuleInit} from '@nestjs/common';
import {SendMailDto} from "../consumer/dtos/sendMail.dto";
import {MinioService} from "../minio/minio.service";
import nodemailer, {Transporter} from "nodemailer"
import {ConfigService} from "@nestjs/config";
import {MailAttachment, MailDto} from "./dtos/mail.dto";
import Mustache from 'mustache';
import {FileDoesNotExist} from "./errors";

@Injectable()
export class MailerService implements OnModuleInit {
    constructor(
        private minioService: MinioService,
        private config: ConfigService,
    ) {
    }

    private transporter: Transporter;
    private mailAddress: string;

    onModuleInit() {
        this.transporter = nodemailer.createTransport({
            host: this.config.getOrThrow("SMTP_HOST"),
            port: this.config.getOrThrow("SMTP_PORT"),
            secure: this.config.getOrThrow("SMTP_SECURE") === "true",
            auth: {
                user: this.config.getOrThrow("SMTP_USER"),
                pass: this.config.getOrThrow("SMTP_TOKEN"),
            },
        });

        this.mailAddress = this.config.getOrThrow("SMTP_MAIL_ADDRESS")
    }

    async sendMailByMinioTemplate(data: SendMailDto) {
        const templateStream = await this.minioService.getFileByPath(data.emailTemplate)
        if (!templateStream) {
            throw new FileDoesNotExist()
        }
        const templateBuffer = await this.minioService.streamToBuffer(templateStream)
        const templateTxt = templateBuffer.toString()
        const attachments = await this.getAttachmentsMinio(data.attachments)
        const from = data.fromName ? `${data.fromName}<${this.mailAddress}>` : this.mailAddress

        await this.sendMail({
            ...data,
            template: templateTxt,
            templateData: data.emailTemplateData,
            from,
            attachments
        })
    }

    async getAttachmentsMinio(attachmentUrls: string[]) {
        if (!attachmentUrls || !attachmentUrls.length) return []
        const attachments: MailAttachment[] = [];

        for (const url of attachmentUrls) {
            try {
                const [, key] = this.minioService.getBucketAndKey(url)
                const filename = this.minioService.getFileNameFromKey(key)
                const templateStream = await this.minioService.getFileByPath(url)
                const templateBuffer = await this.minioService.streamToBuffer(templateStream)
                attachments.push({
                    filename,
                    content: templateBuffer
                })
            } catch (error) {
                console.log(`Error fetching attachment from Minio: ${error.message}`);
            }
        }

        return attachments
    }

    async sendMail(mail: MailDto) {
        const mailHtml = Mustache.render(mail.template, mail.templateData);
        await this.transporter.sendMail({
            ...mail,
            html: mailHtml,
        });
    }
}
