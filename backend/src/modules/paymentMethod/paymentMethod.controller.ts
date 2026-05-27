import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { IPaymentMethod } from '../../shared/Types/Interfaces';
import { PaymentMethodService } from './paymentMethod.service';

@Controller('payment-method')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Post()
  async create(@Body() paymentMethod: Partial<IPaymentMethod>) {
    const p = await this.paymentMethodService.findByPhone(paymentMethod.phone!);
    if (p) throw new NotFoundException('Payment method already exists');

    const newPaymentMethod =
      await this.paymentMethodService.create(paymentMethod);
    return newPaymentMethod;
  }

  @Get()
  async findAll() {
    return await this.paymentMethodService.findAll();
  }

  @Get(':name')
  async findByName(@Param('name') name: string) {
    const paymentMethod = await this.paymentMethodService.findByName(name);
    if (!paymentMethod) throw new NotFoundException('Payment method not found');
    return paymentMethod;
  }
}
