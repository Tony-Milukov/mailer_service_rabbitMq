import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import { v4 } from 'uuid';

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
      let fileName = `${v4()}.${file.originalname.split('.').pop()}`;

      if (defaultFilename) {
        fileName = defaultFilename;
      }

      await this.saveFile(file, bucketName, fileName);

      return `${bucketName}/${fileName}`;
  }

  async getFileByUrl(url: string) {
    const [bucketName, fileName] = this.getLocationDataByUrl(url)

    return await this.minioClient.getObject(bucketName, fileName);
  }

  getLocationDataByUrl (url: string) {
      const path = (new URL(url)).pathname
      return path.slice(1,).split('/');
  }

    async  streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
        const chunks: Buffer[] = [];
        return new Promise((resolve, reject) => {
            stream.on("data", (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
            stream.on("end", () => resolve(Buffer.concat(chunks)));
            stream.on("error", reject);
        });
    }

}
