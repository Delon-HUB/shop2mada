import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OfferEntity } from './entities/offer.entity';
import { Model } from 'mongoose';

@Injectable()
export class OfferService {
  constructor(
    @InjectModel(OfferEntity.name)
    private readonly offerModel: Model<OfferEntity>,
  ) {}

  async create(offer: OfferEntity): Promise<OfferEntity> {
    offer.createdAt = new Date(Date.now());
    offer.updatedAt = new Date(Date.now());

    const createdOffer = await this.offerModel.create(offer);
    return await createdOffer;
  }

  async findAll(): Promise<OfferEntity[]> {
    return await this.offerModel.find().exec();
  }

  async findById(id: string): Promise<OfferEntity | null> {
    return await this.offerModel.findById(id).exec();
  }
}
