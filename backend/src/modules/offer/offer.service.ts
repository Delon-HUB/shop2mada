import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OfferEntity } from './entities/offer.entity';
import { Model } from 'mongoose';
import { IOffer } from '../../shared/Types/Interfaces';

@Injectable()
export class OfferService {
  constructor(
    @InjectModel(OfferEntity.name)
    private readonly offerModel: Model<OfferEntity>,
  ) {}

  async create(offer: Partial<Omit<IOffer, 'deletedAt'>>): Promise<IOffer> {
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
    return [
      ...offers.map((offer) => ({
        ...offer.toObject(),
        _id: offer._id.toString(),
        articles: [],
      })),
    ] as IOffer[];
  }

  async findById(id: string, includeDeleted = false): Promise<IOffer | null> {
    const offer = await this.offerModel.findById(id).exec();
    if (!offer || (includeDeleted && offer.deletedAt)) return null;
    return {
      ...offer.toObject(),
      _id: offer._id.toString(),
      articles: [],
    } as IOffer;
  }

  async findByGameId(
    gameId: string,
    includeDeleted = false,
  ): Promise<IOffer[]> {
    const offers = await this.offerModel
      .find({ gameId, deletedAt: { $exists: includeDeleted } })
      .exec();
    return offers.map((offer) => ({
      ...offer.toObject(),
      _id: offer._id.toString(),
      articles: [],
    })) as IOffer[];
  }

  async update(
    id: string,
    updateData: Partial<IOffer>,
  ): Promise<IOffer | null> {
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
