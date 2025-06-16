import {IsString, IsNotEmpty, IsObject, IsArray, ArrayNotEmpty, IsOptional} from 'class-validator'

export class SendMailDto {
  @IsString()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  /**
   *  MinIO file PATH.
   * These file will be downloaded via MinIO and attached to the email.
   * There can be variables in the email template that will be replaced with the values from emailTemplateData object
   * Example: 'email-templates/template_123.html'
   */
  @IsString()
  @IsNotEmpty()
  emailTemplate: string;

  /**
   * Data that will be used to replace variables in the email template.
   * This object should contain key-value pairs where keys are variable names in the template
   * and values are the data to replace them with.
   * Example: { name: 'John Doe', orderId: '12345' }
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
   * Optional array of full MinIO file PATHS.
   * These files will be downloaded via MinIO and attached to the email.
   * Example: ['mail-attachments/invoice_123.pdf', 'mail-attachments/invoice_124.pdf', 'mail-attachments/invoice_125.pdf']
  */
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachments: string[];
}