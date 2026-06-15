import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OfferEntity, OfferSchema } from '../offer/entities/offer.entity';
import { ArticleEntity, ArticleSchema } from './entities/article.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ArticleEntity.name, schema: ArticleSchema },
      { name: OfferEntity.name, schema: OfferSchema },
    ]),
  ],
  providers: [ArticleService],
  controllers: [ArticleController],
  exports: [ArticleService, MongooseModule],
})
export class ArticleModule {}
