import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OfferEntity, OfferSchema } from './entities/offer.entity';
import { GameEntity, GameSchema } from '../game/entities/game.entity';
import {
  ArticleEntity,
  ArticleSchema,
} from '../article/entities/article.entity';
import { ArticleModule } from '../article/article.module';
import { ArticleService } from '../article/article.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OfferEntity.name, schema: OfferSchema },
      { name: GameEntity.name, schema: GameSchema },
      { name: ArticleEntity.name, schema: ArticleSchema },
    ]),
    ArticleModule,
  ],
  providers: [OfferService, ArticleService],
  controllers: [OfferController],
  exports: [OfferService, ArticleService],
})
export class OfferModule {}
