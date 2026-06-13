import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { IPaymentMethod } from '../../shared/Types/Interfaces';
import { PaymentMethodService } from './paymentMethod.service';

@Controller('payment-method')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Post()
  async create(@Body() paymentMethod: Partial<IPaymentMethod>) {
    const newPaymentMethod =
      await this.paymentMethodService.create(paymentMethod);
    return newPaymentMethod;
  }

  @Get()
  async findAll(@Query('activate') activate: string) {
    return await this.paymentMethodService.findAll(activate == 'true');
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatedDto: Partial<IPaymentMethod>,
  ) {
    return await this.paymentMethodService.update(id, updatedDto);
  }
}
