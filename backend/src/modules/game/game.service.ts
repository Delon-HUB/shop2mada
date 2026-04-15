import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GameEntity } from './entities/game.entity';
import { Model } from 'mongoose';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(GameEntity.name) private readonly gameModel: Model<GameEntity>,
  ) {}

  async create(game: GameEntity): Promise<GameEntity> {
    game.createdAt = new Date(Date.now());
    game.updatedAt = new Date(Date.now());

    const createdGame = await this.gameModel.create(game);
    return await createdGame;
  }

  async findAll(): Promise<GameEntity[]> {
    return await this.gameModel.find().exec();
  }
}
