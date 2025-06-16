import { Inject, Injectable, OnModuleInit} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {SendMailDto} from "./dtos/sendMail.dto";
import {S3Service} from "../s3/s3.service";
import {uuid} from "uuidv4";
import {NoFilesProvided} from "./errors";
import {v4} from "uuid";

@Injectable()
export class EmailsService implements OnModuleInit{
    constructor(
        @Inject("MAILS") private rabbitMq: ClientProxy,
        private s3Service: S3Service
    ) {}

  async onModuleInit() {
   try {
     await this.rabbitMq.connect();
   } catch (e) {
      console.error(e)
   }
  }

  sendMail(data: SendMailDto) {
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
