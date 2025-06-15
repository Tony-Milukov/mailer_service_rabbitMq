import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import { v4 } from 'uuid';
import {FileDoesNotExist} from "../mailer/errors";

@Injectable()
export class MinioService {
  minioClient: Minio.Client;

  onModuleInit() {
    this.minioClient = new Minio.Client({
      endPoint: process.env.MINIO_HOST ?? 'localhost',
      port: parseInt(process.env.MINIO_PORT) ?? 9000,
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    });
  }

  async saveFile(
    file: Express.Multer.File,
    bucketName: string,
    fileName: string,
  ) {
    await this.minioClient.putObject(
      bucketName,
      fileName,
      file.buffer,
      file.size,
      {
        'Content-Type': file.mimetype,
      },
    );
  }

    async uploadFile(
        file: Express.Multer.File,
        bucketName: string,
        defaultFilename: string = null,
    ): Promise<string> {
        if (!file) {
            throw new Error('File not found');
        }
        let fileName = `${v4()}/${file.originalname}`;

        if (defaultFilename) {
            fileName = defaultFilename;
        }

        await this.saveFile(file, bucketName, fileName);

        return `${bucketName}/${fileName}`;
    }

  async getFileByPath(path: string) {
     try {
         const [bucketName, key] = this.getBucketAndKey(path);
         return await this.minioClient.getObject(bucketName, key)
     } catch (error) {
            throw new FileDoesNotExist()
     }
  }

   // Returns the bucket name and key from a path
   // Example: "bucket-name/file-name" -> ["bucket-name", "key"]
   getBucketAndKey (path: string) {
        const parts =  path.split('/');
        const bucket = parts.shift();
        const key = parts.join('/');
        return [bucket, key];
    }

    getFileNameFromKey(key: string): string {
      return key.split('/').pop();
    }

    async streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
        const chunks: Buffer[] = [];
        return new Promise((resolve, reject) => {
            stream.on("data", (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
            stream.on("end", () => resolve(Buffer.concat(chunks)));
            stream.on("error", reject);
        });
    }

}
