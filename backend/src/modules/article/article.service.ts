import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ArticleEntity } from './entities/article.entity';
import { Model } from 'mongoose';
import { IArticle } from '../../shared/Types/Interfaces';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(ArticleEntity.name)
    private readonly articleModel: Model<ArticleEntity>,
  ) {}

  async create(article: Partial<IArticle>): Promise<IArticle> {
    article.createdAt = new Date(Date.now());
    article.updatedAt = new Date(Date.now());

    const createdArticle = await this.articleModel.create(article);
    return {
      ...createdArticle.toObject(),
      _id: createdArticle._id.toString(),
      offerId: createdArticle.offerId.toString(),
    };
  }

  async findAll(): Promise<IArticle[]> {
    const articles = await this.articleModel.find().exec();
    return articles.map((article) => ({
      ...article.toObject(),
      _id: article._id.toString(),
      offerId: article.offerId.toString(),
    }));
  }

  async findById(id: string): Promise<IArticle | null> {
    const article = await this.articleModel.findById(id).exec();
    if (!article) return null;
    return {
      ...article.toObject(),
      _id: article._id.toString(),
      offerId: article.offerId.toString(),
    };
  }

  async findByOfferId(offerId: string): Promise<IArticle[]> {
    const articles = await this.articleModel.find({ offerId }).exec();
    return articles.map((article) => ({
      ...article.toObject(),
      _id: article._id.toString(),
      offerId: article.offerId.toString(),
    }));
  }

  async update(
    id: string,
    updateData: Partial<IArticle>,
  ): Promise<IArticle | null> {
    updateData.updatedAt = new Date(Date.now());
    const updated = await this.articleModel
      .findByIdAndUpdate(id, updateData, { returnDocument: 'after' })
      .exec();
    if (!updated) return null;
    return {
      ...updated.toObject(),
      _id: updated._id.toString(),
      offerId: updated.offerId.toString(),
    };
  }
}
