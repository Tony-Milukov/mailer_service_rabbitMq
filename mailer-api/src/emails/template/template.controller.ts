import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {TemplateService} from "./template.service";
import {UpdateTemplateDto} from "./dtos/updateTemplateDto";
import {CreateTemplateDto} from "./dtos/createTemplateDto";

@Controller('template')
export class TemplateController {
    constructor(private templateService: TemplateService) {}


    @Post()
    async createTemplate(@Body() createTemplateDto: CreateTemplateDto) {
        const template =  await this.templateService.createTemplate(createTemplateDto);
        return {template}
    }

    @Get('/:id')
    async getTemplateById(@Param('id') id: string) {
        const template = await this.templateService.getTemplateOrThrow(parseInt(id));
        return {template};
    }

    @Get()
    async getAllTemplates() {
        const templates = await this.templateService.getAllTemplates();
        return {templates};
    }

    @Patch()
    async updateTemplate(@Body() updateTemplateDto: UpdateTemplateDto) {
        const template = await this.templateService.updateTemplate(updateTemplateDto);
        return {template};
    }

    @Delete('/:id')
    async deleteTemplate(@Param('id') id: string) {
        const template = await this.templateService.deleteTemplate(parseInt(id));
        return {template};
    }
}
