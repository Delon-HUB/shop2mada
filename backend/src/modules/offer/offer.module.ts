import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { GameModule } from '../game/game.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OfferEntity, OfferSchema } from './entities/offer.entity';
import { GameService } from '../game/game.service';
import { GameEntity, GameSchema } from '../game/entities/game.entity';

@Module({
  imports: [
    GameModule,
    MongooseModule.forFeature([
      { name: OfferEntity.name, schema: OfferSchema },
      { name: GameEntity.name, schema: GameSchema },
    ]),
  ],
  providers: [OfferService, GameService],
  controllers: [OfferController],
})
export class OfferModule {}
