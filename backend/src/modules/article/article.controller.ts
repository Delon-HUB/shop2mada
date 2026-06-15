import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import type { IArticle } from '../../shared/Types/Interfaces';
import { Public } from '../../shared/Types/decorators/decorators';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async create(@Body() article: IArticle) {
    return await this.articleService.create(article);
  }

  @Public()
  @Get()
  async findAll() {
    return await this.articleService.findAll();
  }

  @Public()
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.articleService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<IArticle>) {
    return await this.articleService.update(id, updateData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.articleService.softDelete(id);
  }
}
