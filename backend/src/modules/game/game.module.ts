import { forwardRef, Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GameEntity, GameSchema } from './entities/game.entity';
import { OfferModule } from '../offer/offer.module';
import { OfferEntity, OfferSchema } from '../offer/entities/offer.entity';
import { OfferService } from '../offer/offer.service';
import { ArticleModule } from '../article/article.module';
import {
  ArticleEntity,
  ArticleSchema,
} from '../article/entities/article.entity';
import { ArticleService } from '../article/article.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GameEntity.name, schema: GameSchema },
      { name: OfferEntity.name, schema: OfferSchema },
      { name: ArticleEntity.name, schema: ArticleSchema },
    ]),
    forwardRef(() => OfferModule),
    forwardRef(() => ArticleModule),
  ],
  controllers: [GameController],
  providers: [GameService, OfferService, ArticleService],
})
export class GameModule {}
