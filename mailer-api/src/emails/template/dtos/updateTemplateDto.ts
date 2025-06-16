import {IsString, IsNotEmpty, IsObject, IsArray, ArrayNotEmpty, IsOptional, ValidateIf, IsNumber} from 'class-validator'

export class UpdateTemplateDto {
  @ValidateIf((o) => !o.body)
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((o) => !o.name)
  @IsString()
  @IsNotEmpty()
  body: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  id: number
}