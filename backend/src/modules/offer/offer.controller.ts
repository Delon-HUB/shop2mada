import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { GameService } from '../game/game.service';
import { type IOffer } from '../../shared/Types/Interfaces';

@Controller('offer')
export class OfferController {
  constructor(
    private readonly offerService: OfferService,
    private readonly gameService: GameService,
  ) {}

  @Post()
  async create(@Body() offer: Partial<IOffer>) {
    const game = await this.gameService.findById(offer.gameId!);
    if (!game) throw new NotFoundException('Game not found');

    const newOffer = await this.offerService.create(offer);
    return newOffer;
  }

  @Get()
  async findAll() {
    return this.offerService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const offer = await this.offerService.findById(id);
    if (!offer) throw new NotFoundException('Offer not found');
    return offer;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<IOffer>) {
    const updatedOffer = await this.offerService.findById(id);
    if (!updatedOffer) throw new NotFoundException('Offer not found');
    return await this.offerService.update(id, updateData);
  }
}
