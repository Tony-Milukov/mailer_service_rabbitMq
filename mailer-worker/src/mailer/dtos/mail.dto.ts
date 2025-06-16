export class MailDto {
    from: string
    to: string;
    subject: string;
    template: string;
    templateData: Record<string, any>;
    attachments?: MailAttachment[];
}

export class MailAttachment {
    filename: string;
    content: any;
}