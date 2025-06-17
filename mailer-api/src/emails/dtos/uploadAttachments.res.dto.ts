import { IsString, IsNotEmpty, IsObject, IsArray, IsOptional, ValidateIf, IsNumber, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadAttachmentsResponse {
  @ApiProperty()
  @IsArray()
  attachments: string[];
}