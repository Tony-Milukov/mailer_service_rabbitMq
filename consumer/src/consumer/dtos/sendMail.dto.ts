import {IsString, IsNotEmpty, IsObject, IsArray, ArrayNotEmpty, IsOptional} from 'class-validator'
import {Optional} from "@nestjs/common";

export class SendMailDto {
  // @IsString()
  // @IsNotEmpty()
  // from: string
  @IsString()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  emailTemplateUrl: string;

  @IsObject()
  @IsNotEmpty()
  emailTemplateData: Record<string, any>;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  fromName: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  attachments: string[];
}