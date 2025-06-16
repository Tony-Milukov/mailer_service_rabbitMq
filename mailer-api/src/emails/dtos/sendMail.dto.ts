import {IsString, IsNotEmpty, IsObject, IsArray, ArrayNotEmpty, IsOptional, ValidateIf, IsNumber} from 'class-validator'

export class SendMailDto {
  @IsString()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  /**
   * These file will be downloaded via MinIO and used as template of email.
   */
  @IsObject()
  @IsNotEmpty()
  emailTemplateData: Record<string, any>;

  /**
   * Optional name of the sender.
   * This will be used in the "From" field of the email.
   * Example: 'Noreply'
   * If not provided, the email address will be used as the sender name.
   */
  @IsOptional()
  @IsString()
  fromName: string;

  /**
   * S3 file PATH.
   * IF emailTemplateS3Path and emailTemplatePlain are both provided, emailTemplatePlain will be used.
   * These file will be downloaded via MinIO and used as template of email.
   * There can be variables in the email template that will be replaced with the values from emailTemplateData object
   * Example: 'email-templates/template_123.html'
   */
  @ValidateIf(o => !o.emailTemplateId && !o.emailTemplatePlain)
  @IsString()
  @IsNotEmpty()
  emailTemplateS3Path: string;

  /**
   * Optional ID of the email template in the database.
   * IF emailTemplateS3Path and emailTemplatePlain are both provided, emailTemplatePlain will be used.
   * This will be used to fetch the email template from the database.
   * There can be variables in the email template that will be replaced with the values from emailTemplateData object
   */
  @ValidateIf(o => !o.emailTemplateS3Path && !o.emailTemplatePlain)
  @IsNotEmpty()
  @IsNumber()
  emailTemplateId: number;

  /**
   * .
   * This will be used in the "From" field of the email.
   * IF emailTemplateS3Path and emailTemplatePlain are both provided, emailTemplatePlain will be used.
   * There can be variables in the email template that will be replaced with the values from emailTemplateData object
   */
  @ValidateIf(o => !o.emailTemplateS3Path && !o.emailTemplateId)
  @IsString()
  emailTemplatePlain: string;

  /**
   * Optional array of full MinIO file PATHS.
   * These files will be downloaded via MinIO and attached to the email.
   * Example: ['mail-attachments/invoice_123.pdf', 'mail-attachments/invoice_124.pdf', 'mail-attachments/invoice_125.pdf']
   */
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachments: string[];


  /**
   * Optional flag to delete attachments after sending the email.
   * If true, the attachments will be deleted from MinIO after the email is sent.
   * Default is false.
   */
  @IsOptional()
  deleteAttachmentsAfterSending: boolean;
}