import { Inject, Injectable, OnModuleInit} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {S3Service} from "../s3/s3.service";
import {uuid} from "uuidv4";
import {NoFilesProvided} from "./errors";
import {v4} from "uuid";
import {TemplatesService} from "./templates/templates.service";
import {SendMailReq} from "./dtos/sendMail.req";

@Injectable()
export class EmailsService implements OnModuleInit{
    constructor(
        @Inject("MAILS") private rabbitMq: ClientProxy,
        private s3Service: S3Service,
        private templateService: TemplatesService,
    ) {}

  async onModuleInit() {
   try {
     await this.rabbitMq.connect();
   } catch (e) {
      console.error(e)
   }
  }

  async sendMail(data: SendMailReq) {
        // check if the data contains a template, and if it is valid
    await this.templateService.throwIfInvalidTemplate(data);
    this.rabbitMq.emit("email", data)
  }

    uploadAttachments(files: Express.Multer.File[]) {
        if (!files || files.length === 0) {
            throw new NoFilesProvided()
        }

        const bucketName = process.env.S3_EMAIL_ATTACHMENTS_BUCKET;

        return Promise.all(
            files.map(file => {
                return this.s3Service.uploadFile(file, bucketName);
            })
        );

    }
}
