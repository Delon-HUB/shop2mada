import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GameEntity } from './entities/game.entity';
import { Model } from 'mongoose';
import { IGame } from '../../shared/Types/Interfaces';
import { OfferService } from '../offer/offer.service';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(GameEntity.name) private readonly gameModel: Model<GameEntity>,
    private readonly offerService: OfferService,
  ) {}

  async create(game: Partial<Omit<IGame, 'deletedAt'>>): Promise<IGame> {
    game.createdAt = new Date(Date.now());
    game.updatedAt = new Date(Date.now());

    const createdGame = await this.gameModel.create(game);
    return {
      ...createdGame.toObject(),
      offers: [],
      _id: createdGame._id.toString(),
    } as IGame;
  }

  async findAll(includeDeleted = false): Promise<IGame[]> {
    const games = await this.gameModel
      .find({ deletedAt: { $exists: includeDeleted } })
      .exec();
    return (await Promise.all(
      games.map(async (game) => ({
        ...game.toObject(),
        _id: game._id.toString(),
        offers: await this.offerService.findByGameId(game.id),
      })),
    )) as IGame[];
  }

  async findById(id: string, includeDeleted = false): Promise<IGame | null> {
    const game = await this.gameModel
      .findById({ _id: id, deletedAt: { $exists: includeDeleted } })
      .exec();
    if (!game) return null;
    return {
      ...game.toObject(),
      _id: game._id.toString(),
      offers: await this.offerService.findByGameId(game.id),
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
      offers: await this.offerService.findByGameId(updated.id),
    };
  }

  async delete(id: string): Promise<IGame | null> {
    const deleted = await this.gameModel.findByIdAndDelete(id).exec();
    if (!deleted) return null;
    return {
      ...deleted.toObject(),
      _id: deleted._id.toString(),
      offers: [],
    };
  }

  async softDelete(id: string): Promise<IGame | null> {
    const game = await this.findById(id);
    if (!game) throw new NotFoundException('Game not found');
    const offers = await this.offerService.findByGameId(game._id);
    offers.forEach(async (o) => await this.offerService.softDelete(o._id));

    const deleted = await this.gameModel
      .findByIdAndUpdate(
        id,
        { deletedAt: new Date(Date.now()) },
        { returnDocument: 'after' },
      )
      .exec();
    if (!deleted) return null;
    return {
      ...deleted.toObject(),
      _id: deleted._id.toString(),
      deletedAt: deleted.deletedAt,
      offers: [],
    };
  }
}
