import {Injectable, OnModuleInit} from '@nestjs/common';
import * as Minio from 'minio';
import { v4 } from 'uuid';

@Injectable()
export class S3Service implements OnModuleInit {
    s3Client: Minio.Client;

    onModuleInit() {
        this.s3Client = new Minio.Client({
            endPoint: process.env.S3_ENDPOINT ?? 'localhost',
            port: process.env.S3_PORT ? parseInt(process.env.S3_PORT, 10) : 9000,
            useSSL: false,
            accessKey: process.env.S3_ACCESS_KEY,
            secretKey: process.env.S3_SECRET_KEY,
        });
    }

    async saveFile(
        file: Express.Multer.File,
        bucketName: string,
        fileName: string,
    ) {
        await this.s3Client.putObject(
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

        return await this.s3Client.getObject(bucketName, key);
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

    async deleteFilesByKeys(bucket: string, keys: string[]): Promise<void> {
        try {
            await this.s3Client.removeObjects(bucket, keys);
        } catch (error) {
            console.error(`Error deleting file from S3: ${error.message}`);
        }
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
