import {IsString, IsNotEmpty, IsOptional, ValidateIf, IsNumber} from 'class-validator'
import {ApiProperty} from "@nestjs/swagger";

export class UpdateTemplateReq {
  @ApiProperty()
  @ValidateIf((o) => !o.body)
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @ValidateIf((o) => !o.name)
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  id: number
}