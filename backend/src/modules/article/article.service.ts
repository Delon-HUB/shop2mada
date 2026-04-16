import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ArticleEntity } from './entities/article.entity';
import { Model } from 'mongoose';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(ArticleEntity.name)
    private readonly articleModel: Model<ArticleEntity>,
  ) {}

  async create(article: ArticleEntity): Promise<ArticleEntity> {
    article.createdAt = new Date(Date.now());
    article.updatedAt = new Date(Date.now());

    const createdArticle = await this.articleModel.create(article);
    return await createdArticle;
  }

  async findAll(): Promise<ArticleEntity[]> {
    return await this.articleModel.find().exec();
  }

  async findById(id: string): Promise<ArticleEntity | null> {
    return await this.articleModel.findById(id).exec();
  }
}
