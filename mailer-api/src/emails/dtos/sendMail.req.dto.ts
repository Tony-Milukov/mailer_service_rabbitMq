import { IsString, IsNotEmpty, IsObject, IsArray, IsOptional, ValidateIf, IsNumber, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@ValidatorConstraint({ name: 'atLeastOneTemplate', async: false })
class AtLeastOneTemplate implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments) {
    const o = args.object as any;
    return !!(o.emailTemplateId || o.emailTemplatePlain || o.emailTemplateS3Path);
  }
  defaultMessage() {
    return 'At least one template source must be provided: emailTemplateId, emailTemplatePlain, or emailTemplateS3Path';
  }
}

export class SendMailReqDto {
  @ApiProperty({ description: 'Recipient email address.' })
  @IsString()
  @IsNotEmpty()
  to: string;

  @ApiProperty({ description: 'Email subject.' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    description: 'Data for template variable substitution.',
    type: Object,
  })
  @IsObject()
  @IsNotEmpty()
  emailTemplateData: Record<string, any>;

  @ApiProperty({ description: 'Sender name (optional).' })
  @IsOptional()
  @IsString()
  fromName: string;

  @ApiProperty({
    description: 'S3/MinIO path to the email template. Used if DB and plain templates are not provided.',
    required: false,
    type: String,
  })
  @ValidateIf(o => !o.emailTemplateId && !o.emailTemplatePlain)
  @IsString()
  @IsNotEmpty()
  emailTemplateS3Path: string;

  @ApiProperty({
    description: 'Database template ID. Has the highest priority.',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  emailTemplateId: number;

  @ApiProperty({
    description: 'Plain text email template. Used if DB template is not provided.',
    required: false,
    type: String,
  })
  @ValidateIf(o => !o.emailTemplateId)
  @IsString()
  emailTemplatePlain: string;

  @ApiProperty({
    description: 'List of S3/MinIO attachment paths (optional).',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachments: string[];

  @ApiProperty({ description: 'Delete attachments after sending (optional).' })
  @IsOptional()
  deleteAttachmentsAfterSending: boolean;

  @Validate(AtLeastOneTemplate)
  _atLeastOneTemplate: any;
}