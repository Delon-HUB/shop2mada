import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OfferEntity } from './entities/offer.entity';
import { Model } from 'mongoose';
import { IOffer } from '../../shared/Types/Interfaces';
import { ArticleService } from '../article/article.service';
import { GameEntity } from '../game/entities/game.entity';

@Injectable()
export class OfferService {
  constructor(
    @InjectModel(OfferEntity.name)
    private readonly offerModel: Model<OfferEntity>,
    @InjectModel(GameEntity.name)
    private readonly gameModel: Model<GameEntity>,
    private readonly articleService: ArticleService,
  ) {}

  async create(offer: Partial<Omit<IOffer, 'deletedAt'>>): Promise<IOffer> {
    const game = await this.gameModel.findById(offer.gameId!);
    if (!game) throw new NotFoundException('Game not found');

    offer.createdAt = new Date(Date.now());
    offer.updatedAt = new Date(Date.now());
    const createdOffer = await this.offerModel.create(offer);
    return {
      ...createdOffer.toObject(),
      _id: createdOffer._id.toString(),
      articles: [],
    } as IOffer;
  }

  async findAll(includeDeleted = false): Promise<IOffer[]> {
    const offers = await this.offerModel
      .find({ deletedAt: { $exists: includeDeleted } })
      .exec();

    return (await Promise.all(
      offers.map(async (offer) => ({
        ...offer.toObject(),
        _id: offer._id.toString(),
        gameId: offer.gameId.toString(),
        articles: await this.articleService.findByOfferId(offer.id),
      })),
    )) as IOffer[];
  }

  async findById(id: string, includeDeleted = false): Promise<IOffer | null> {
    const offer = await this.offerModel.findById(id).exec();
    if (!offer || (includeDeleted && offer.deletedAt)) return null;
    return {
      ...offer.toObject(),
      _id: offer._id.toString(),
      articles: await this.articleService.findByOfferId(offer.id),
    } as IOffer;
  }

  async findByGameId(
    gameId: string,
    includeDeleted = false,
  ): Promise<IOffer[]> {
    const offers = await this.offerModel
      .find({ gameId, deletedAt: { $exists: includeDeleted } })
      .exec();
    return (await Promise.all(
      offers.map(async (offer) => ({
        ...offer.toObject(),
        _id: offer._id.toString(),
        gameId: offer.gameId.toString(),
        articles: await this.articleService.findByOfferId(offer.id),
      })),
    )) as IOffer[];
  }

  async update(
    id: string,
    updateData: Partial<IOffer>,
  ): Promise<IOffer | null> {
    const updatedOffer = await this.findById(id);
    if (!updatedOffer) throw new NotFoundException('Offer not found');

    updateData.updatedAt = new Date(Date.now());
    const updated = await this.offerModel
      .findByIdAndUpdate(id, updateData, {
        returnDocument: 'after',
      })
      .exec();
    if (!updated) return null;
    return {
      ...updated.toObject(),
      _id: updated._id.toString(),
      gameId: updated.gameId.toString(),
      articles: [],
    };
  }

  async delete(id: string): Promise<IOffer | null> {
    const deleted = await this.offerModel.findByIdAndDelete(id).exec();
    if (!deleted) return null;
    return {
      ...deleted.toObject(),
      _id: deleted._id.toString(),
      gameId: deleted.gameId.toString(),
      articles: [],
    };
  }

  async softDelete(id: string): Promise<IOffer | null> {
    const offer = await this.findById(id);
    if (!offer) throw new NotFoundException('Offer not found');

    const articles = await this.articleService.findByOfferId(offer._id);
    articles.forEach(async (a) => await this.articleService.softDelete(a._id));

    const deleted = await this.offerModel
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
      gameId: deleted.gameId.toString(),
      deletedAt: deleted.deletedAt,
      articles: [],
    };
  }
}
