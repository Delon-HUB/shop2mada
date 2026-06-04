import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { IPayment } from '../../shared/Types/Interfaces';
import { PaymentMethodService } from '../paymentMethod/paymentMethod.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Get()
  async findAll() {
    return 'hello from payments';
  }

  @Post()
  async create(@Body() createPaymentDto: Partial<IPayment>) {
    const pm = await this.paymentMethodService.findById(
      createPaymentDto.paymentMethod!,
    );
    if (!pm) throw new NotFoundException('PAYMENT_METHOD_NOT_FOUND');

    return pm;
  }
}
