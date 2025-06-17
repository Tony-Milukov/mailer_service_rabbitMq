import {ApiProperty} from "@nestjs/swagger";

export class UploadAttachmentsReq {
    @ApiProperty({
        description: 'Attachments to be uploaded',
        type: 'file'
    })
    files: Express.Multer.File[];
}