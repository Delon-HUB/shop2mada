import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { OfferService } from '../offer/offer.service';
import { type IArticle } from '../../shared/Types/Interfaces';

@Controller('article')
export class ArticleController {
  constructor(
    private readonly offerService: OfferService,
    private readonly articleService: ArticleService,
  ) {}

  @Post()
  async create(@Body() article: IArticle) {
    const offer = await this.offerService.findById(article.offerId);
    if (!offer) throw new NotFoundException('Offer not found');

    const newArticle = await this.articleService.create(article);
    return newArticle;
  }

  @Get()
  async findAll() {
    return await this.articleService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const article = await this.articleService.findById(id);
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }
}
