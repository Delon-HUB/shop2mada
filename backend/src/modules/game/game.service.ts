import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GameEntity } from './entities/game.entity';
import { Model } from 'mongoose';
import { IGame } from '../../shared/Types/Interfaces';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(GameEntity.name) private readonly gameModel: Model<GameEntity>,
  ) {}

  async create(game: GameEntity): Promise<IGame> {
    game.createdAt = new Date(Date.now());
    game.updatedAt = new Date(Date.now());

    const createdGame = await this.gameModel.create(game);
    return {
      ...createdGame.toObject(),
      offers: [],
      id: createdGame._id.toString(),
    } as IGame;
  }

  async findAll(): Promise<IGame[]> {
    const games = await this.gameModel.find().exec();
    return [
      ...games.map((game) => ({
        ...game.toObject(),
        offers: [],
        id: game._id.toString(),
      })),
    ] as IGame[];
  }

  async findById(id: string): Promise<IGame | null> {
    const game = await this.gameModel.findById(id).exec();
    if (!game) return null;
    return {
      ...game.toObject(),
      offers: [],
      id: game._id.toString(),
    } as IGame;
  }
}
