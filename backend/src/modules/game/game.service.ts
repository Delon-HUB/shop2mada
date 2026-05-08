import { Injectable } from '@nestjs/common';
import { InjectModel, Schema } from '@nestjs/mongoose';
import { GameEntity } from './entities/game.entity';
import { Model, SchemaType, SchemaTypes } from 'mongoose';
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
    return (await createdGame) as IGame;
  }

  async findAll(): Promise<IGame[]> {
    return (await this.gameModel.find().exec()) as IGame[];
  }

  async findById(id: string): Promise<IGame | null> {
    return (await this.gameModel.findById(id).exec()) as IGame | null;
  }
}
