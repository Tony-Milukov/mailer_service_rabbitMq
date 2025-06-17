import {IsString, IsNotEmpty} from 'class-validator'
import {ApiProperty} from "@nestjs/swagger";

export class CreateTemplate {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  body: string;
}