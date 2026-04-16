import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OfferEntity, OfferSchema } from '../offer/entities/offer.entity';
import { ArticleEntity, ArticleSchema } from './entities/article.entity';
import { OfferModule } from '../offer/offer.module';
import { OfferService } from '../offer/offer.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OfferEntity.name, schema: OfferSchema },
      { name: ArticleEntity.name, schema: ArticleSchema },
    ]),
    OfferModule,
  ],
  providers: [ArticleService, OfferService],
  controllers: [ArticleController],
})
export class ArticleModule {}
