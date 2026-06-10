import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IPayment } from '../../shared/Types/Interfaces';
import { EPaymentStatus } from '../../shared/Types/Enums';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  async findAll() {
    return 'hello from payments';
  }

  @Post()
  async create(@Body() createPaymentDto: Partial<IPayment>) {
    const pm = await this.paymentService.findById(
      createPaymentDto.paymentMethod!,
    );
    if (!pm) throw new NotFoundException('PAYMENT_METHOD_NOT_FOUND');

    return pm;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<IPayment>) {
    return await this.paymentService.update(id, {
      paymentStatus: updateData.paymentStatus,
    });
  }
}
