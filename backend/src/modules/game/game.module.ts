import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GameEntity, GameSchema } from './entities/game.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: GameEntity.name, schema: GameSchema }]),
  ],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
