import { Injectable } from '@nestjs/common';
import {MailAttachment} from "../dtos/mail.dto";
import {S3Service} from "../../s3/s3.service";
import {InjectPinoLogger, PinoLogger} from "nestjs-pino";

@Injectable()
export class AttachmentsService {
    constructor(
        @InjectPinoLogger(AttachmentsService.name)
        private readonly logger: PinoLogger,

        private s3Service: S3Service
    ) {}

    async deleteAttachmentsFromS3(attachmentUrls: string[]) {
        if (!attachmentUrls || !attachmentUrls.length) return;

        const groupedUrls = attachmentUrls.reduce((acc, url) => {
            const [, key] = this.s3Service.getBucketAndKey(url);
            const [bucketName,] = this.s3Service.getBucketAndKey(url);
            if (!acc[bucketName]) {
                acc[bucketName] = [];
            }
            acc[bucketName].push(key);
            return acc;
        }, {});

        for (const bucketName in groupedUrls) {
            const keys = groupedUrls[bucketName];
            try {
                await this.s3Service.deleteFilesByKeys(bucketName, keys);
            } catch (error) {
                this.logger.error(`Error deleting files from S3: ${error.message}`);
            }
        }
    }


    async getAttachmentsFromS3(attachmentUrls: string[]): Promise<MailAttachment[]> {
        if (!attachmentUrls || !attachmentUrls.length) return []
        const attachments: MailAttachment[] = [];

        for (const url of attachmentUrls) {
            try {
                const [, key] = this.s3Service.getBucketAndKey(url)
                const filename = this.s3Service.getFileNameFromKey(key)
                const templateStream = await this.s3Service.getFileByPath(url)
                const templateBuffer = await this.s3Service.streamToBuffer(templateStream)
                attachments.push({
                    filename,
                    content: templateBuffer
                })
            } catch (error) {
                this.logger.error(`Error fetching attachment from S3: ${error.message}`);
            }
        }

        return this.ensureMailAttachmentsAreUnique(attachments);
    }

    async ensureMailAttachmentsAreUnique(attachments: MailAttachment[]): Promise<MailAttachment[]>  {
        const uniqueAttachments = new Map<string, MailAttachment>();

        for (const attachment of attachments) {
            if (!uniqueAttachments.has(attachment.filename)) {
                uniqueAttachments.set(attachment.filename, attachment);
            } else {
                const [filename, extension] = attachment.filename.split('.')

                const newUniqueName = filename + "_" + this.randomId(5) + "." + extension;
                attachment.filename = newUniqueName;
                uniqueAttachments.set(newUniqueName, attachment)
            }
        }

        return Array.from(uniqueAttachments.values());
    }

    randomId(len: number): string {
        return Math.random().toString(36).substr(2, len);
    }
}
