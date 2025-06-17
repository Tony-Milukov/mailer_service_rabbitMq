import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadAttachmentsRes {
  @ApiProperty()
  @IsArray()
  attachments: string[];
}