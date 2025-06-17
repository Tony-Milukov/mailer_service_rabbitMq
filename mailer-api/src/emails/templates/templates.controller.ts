import {Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors} from '@nestjs/common';
import {TemplatesService} from "./templates.service";
import {UpdateTemplateReq} from "./dtos/updateTemplateReq";
import {CreateTemplate} from "./dtos/createTemplate.req.dto";
import {ApiBearerAuth, ApiCreatedResponse, ApiProperty, ApiTags} from "@nestjs/swagger";
import {AuthInterceptor} from "../../auth/auth.interceptor";
import {Template} from "./dtos/template";

@ApiBearerAuth()
@ApiTags('templates')

@UseInterceptors(AuthInterceptor)
@Controller('templates')
export class TemplatesController {
    constructor(private templateService: TemplatesService) {}

    @Post()
    @ApiCreatedResponse({ type: Template })
    async createTemplate(@Body() createTemplateDto: CreateTemplate): Promise<Template> {
        return  await this.templateService.createTemplate(createTemplateDto);
    }

    @Get('/:id')
    @ApiCreatedResponse({ type: Template })
    async getTemplateById(@Param('id') id: string): Promise<Template> {
        return await this.templateService.getTemplateOrThrow(parseInt(id));
    }

    @Get()
    @ApiCreatedResponse({ type: [Template] })
    async getAllTemplates(): Promise<Template[]> {
        return await this.templateService.getAllTemplates();
    }

    @Patch()
    @ApiCreatedResponse({ type: Template })
    async updateTemplate(@Body() updateTemplateDto: UpdateTemplateReq): Promise<Template> {
        return await this.templateService.updateTemplate(updateTemplateDto);
    }

    @Delete('/:id')
    @ApiCreatedResponse({ type: Template })
    async deleteTemplate(@Param('id') id: string): Promise<Template> {
        return await this.templateService.deleteTemplate(parseInt(id));
    }
}
