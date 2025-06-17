import {IsString, IsNotEmpty} from 'class-validator'
import {ApiProperty} from "@nestjs/swagger";

export class Template {
    @ApiProperty({
        description: 'Name of the email template',
        example: 'Welcome Email',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Body of the email template in HTML format',
        example: '<h1>Welcome to our service: {{name}}!</h1>',
    })
    @IsString()
    @IsNotEmpty()
    body: string;

    @ApiProperty()
    id: number;
}