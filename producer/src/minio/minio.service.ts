import {Injectable, OnModuleInit} from '@nestjs/common';
import * as Minio from 'minio';
import { v4 } from 'uuid';

@Injectable()
export class MinioService implements OnModuleInit {
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
    const [bucketName, key] = this.getBucketAndKey(path);
    const fileName = this.getFileNameFromKey(key);

    return await this.minioClient.getObject(bucketName, fileName);
  }

    // Returns the bucket name and key from a path
    // Example: "bucket-name/file-name" -> ["bucket-name", "key"]
    getBucketAndKey (path: string) {
        const parts =  path.split('/');
        const bucket = parts.shift();
        const fileName = parts.join('/');
        return [bucket, fileName];
    }

    getFileNameFromKey(key: string): string {
        return key.split('/').pop();
    }
}
