import { Inject, Injectable, OnModuleInit} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {SendMailDto} from "./dtos/sendMail.dto";
import {MinioService} from "../minio/minio.service";
import {uuid} from "uuidv4";
import {NoFilesProvided} from "./errors";
import {v4} from "uuid";

@Injectable()
export class EmailsService implements OnModuleInit{
    constructor(
        @Inject("MAILS") private rabbitMq: ClientProxy,
        private minioService: MinioService
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

        const bucketName = process.env.MINIO_EMAIL_ATTACHMENTS_BUCKET;

        return Promise.all(
            files.map(file => {
                return this.minioService.uploadFile(file, bucketName);
            })
        );

    }
}
