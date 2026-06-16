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
import { PaymentService } from './payment.service';
import { Public } from '../../shared/Types/decorators/decorators';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  async findAll() {
    return 'hello from payments';
  }

  @Public()
  @Post()
  async create(@Body() createPaymentDto: Partial<IPayment>) {
    return await this.paymentService.create(createPaymentDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<IPayment>) {
    return await this.paymentService.update(id, {
      paymentStatus: updateData.paymentStatus,
    });
  }
}
