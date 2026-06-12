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
      _id: createdGame._id.toString(),
    } as IGame;
  }

  async findAll(): Promise<IGame[]> {
    const games = await this.gameModel.find().exec();
    return [
      ...games.map((game) => ({
        ...game.toObject(),
        offers: [],
        _id: game._id.toString(),
      })),
    ] as IGame[];
  }

  async findById(id: string): Promise<IGame | null> {
    const game = await this.gameModel.findById(id).exec();
    if (!game) return null;
    return {
      ...game.toObject(),
      offers: [],
      _id: game._id.toString(),
    } as IGame;
  }

  async update(id: string, updateData: Partial<IGame>): Promise<IGame | null> {
    updateData.updatedAt = new Date(Date.now());
    const updated = await this.gameModel
      .findByIdAndUpdate(id, updateData, { returnDocument: 'after' })
      .exec();
    if (!updated) return null;
    return {
      ...updated.toObject(),
      _id: updated._id.toString(),
      offers: [],
    };
  }
}
