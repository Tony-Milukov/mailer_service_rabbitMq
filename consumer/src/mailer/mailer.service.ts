import { Injectable } from '@nestjs/common';
import {SendMailDto} from "../consumer/dtos/sendMail.dto";
import {MinioService} from "../minio/minio.service";
import nodemailer, {Transporter} from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport";
import {ConfigService} from "@nestjs/config";
import {MailAttachment, MailDto} from "./dtos/mail.dto";
import Mustache from 'mustache';
@Injectable()
export class MailerService  {
    constructor(
        private minioService: MinioService,
        private config: ConfigService,
    ) {}
    private transporter: Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>
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
            const templateStream = await this.minioService.getFileByUrl(data.emailTemplateUrl)
            const templateBuffer = await this.minioService.streamToBuffer(templateStream)
            const templateTxt = templateBuffer.toString()
            const attachments = await this.getAttachmentsMinio(data.attachments)

            await this.sendMail({
                ...data,
                template: templateTxt,
                templateData: data.emailTemplateData,
                from: `${data.fromName}<${this.mailAddress}>`,
                attachments
            })
    }

    async getAttachmentsMinio(attachmentUrls: string[]) {
        if (!attachmentUrls || !attachmentUrls.length) return []
        const attachments: MailAttachment[] = [];

        for (const url of attachmentUrls) {
            const [,filename] = this.minioService.getLocationDataByUrl(url)
            const templateStream = await this.minioService.getFileByUrl(url)
            const templateBuffer = await this.minioService.streamToBuffer(templateStream)
            attachments.push({
                filename,
                content: templateBuffer
            })
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
