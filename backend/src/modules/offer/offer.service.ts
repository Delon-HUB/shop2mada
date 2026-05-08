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

  async create(offer: Partial<IOffer>): Promise<IOffer> {
    offer.createdAt = new Date(Date.now());
    offer.updatedAt = new Date(Date.now());

    const createdOffer = await this.offerModel.create(offer);
    return {
      ...createdOffer.toObject(),
      id: createdOffer._id.toString(),
      articles: [],
    } as IOffer;
  }

  async findAll(): Promise<IOffer[]> {
    const offers = await this.offerModel.find().exec();
    return [
      ...offers.map((offer) => ({
        ...offer.toObject(),
        id: offer._id.toString(),
        articles: [],
      })),
    ] as IOffer[];
  }

  async findById(id: string): Promise<IOffer | null> {
    const offer = await this.offerModel.findById(id).exec();
    if (!offer) return null;
    return {
      ...offer.toObject(),
      id: offer._id.toString(),
      articles: [],
    } as IOffer;
  }

  async findByGameId(gameId: string): Promise<IOffer[]> {
    const offers = await this.offerModel.find({ gameId }).exec();
    return offers.map((offer) => ({
      ...offer.toObject(),
      id: offer._id.toString(),
      articles: [],
    })) as IOffer[];
  }
}
