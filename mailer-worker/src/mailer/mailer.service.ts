import {Injectable, OnModuleInit} from '@nestjs/common';
import {SendMailDto} from "../consumer/dtos/sendMail.dto";
import nodemailer, {Transporter} from "nodemailer"
import {ConfigService} from "@nestjs/config";
import {MailDto} from "./dtos/mail.dto";
import Mustache from 'mustache';
import {TemplatesService} from "./templates/templates.service";
import {AttachmentsService} from "./attachments/attachments.service";

@Injectable()
export class MailerService implements OnModuleInit {
    constructor(
        private config: ConfigService,
        private readonly templateService: TemplatesService,
        private readonly attachmentService: AttachmentsService
    ) {}

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

    async sendMailByTemplate(data: SendMailDto) {
        const templateTxt = await this.templateService.getTemplateTxt(data);
        const attachments = await this.attachmentService.getAttachmentsFromS3(data.attachments)
        const from = data.fromName ? `${data.fromName}<${this.mailAddress}>` : this.mailAddress

        await this.sendMail({
            ...data,
            template: templateTxt,
            templateData: data.emailTemplateData,
            from,
            attachments
        })

        if (data.attachments && data.attachments.length && data.deleteAttachmentsAfterSending) {
            await this.attachmentService.deleteAttachmentsFromS3(data.attachments)
        }
    }



    async sendMail(mail: MailDto) {
        const mailHtml = Mustache.render(mail.template, mail.templateData);
        await this.transporter.sendMail({
            ...mail,
            html: mailHtml,
        });
    }
}
