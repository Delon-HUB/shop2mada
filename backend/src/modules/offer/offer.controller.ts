import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { type IOffer } from '../../shared/Types/Interfaces';
import { Public } from '../../shared/Types/decorators/decorators';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post()
  async create(@Body() offer: Partial<IOffer>) {
    return await this.offerService.create(offer);
  }

  @Public()
  @Get()
  async findAll() {
    return this.offerService.findAll();
  }

  @Public()
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.offerService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<IOffer>) {
    return await this.offerService.update(id, updateData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.offerService.softDelete(id);
  }
}
