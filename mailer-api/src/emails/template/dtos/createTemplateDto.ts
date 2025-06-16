import {IsString, IsNotEmpty} from 'class-validator'

export class CreateTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  body: string;
}