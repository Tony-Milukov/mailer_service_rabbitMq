import {Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors} from '@nestjs/common';
import {TemplatesService} from "./templates.service";
import {UpdateTemplateReqDto} from "./dtos/updateTemplate.req.dto";
import {CreateTemplate} from "./dtos/createTemplate.req.dto";
import {ApiBearerAuth, ApiCreatedResponse, ApiProperty, ApiTags} from "@nestjs/swagger";
import {AuthInterceptor} from "../../auth/auth.interceptor";
import {TemplateDto} from "./dtos/template.dto";

@ApiBearerAuth()
@ApiTags('templates')

@UseInterceptors(AuthInterceptor)
@Controller('templates')
export class TemplatesController {
    constructor(private templateService: TemplatesService) {}

    @Post()
    @ApiCreatedResponse({ type: TemplateDto })
    async createTemplate(@Body() createTemplateDto: CreateTemplate): Promise<TemplateDto> {
        return  await this.templateService.createTemplate(createTemplateDto);
    }

    @Get('/:id')
    @ApiCreatedResponse({ type: TemplateDto })
    async getTemplateById(@Param('id') id: string): Promise<TemplateDto> {
        return await this.templateService.getTemplateOrThrow(parseInt(id));
    }

    @Get()
    @ApiCreatedResponse({ type: [TemplateDto] })
    async getAllTemplates(): Promise<TemplateDto[]> {
        return await this.templateService.getAllTemplates();
    }

    @Patch()
    @ApiCreatedResponse({ type: TemplateDto })
    async updateTemplate(@Body() updateTemplateDto: UpdateTemplateReqDto): Promise<TemplateDto> {
        return await this.templateService.updateTemplate(updateTemplateDto);
    }

    @Delete('/:id')
    @ApiCreatedResponse({ type: TemplateDto })
    async deleteTemplate(@Param('id') id: string): Promise<TemplateDto> {
        return await this.templateService.deleteTemplate(parseInt(id));
    }
}
