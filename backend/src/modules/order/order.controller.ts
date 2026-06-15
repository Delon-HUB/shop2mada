import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { IOrder, IPayment } from '../../shared/Types/Interfaces';
import { OrderService } from './order.service';
import { Public } from '../../shared/Types/decorators/decorators';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAll() {
    const orders = await this.orderService.findAll();
    return orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  @Public()
  @Post()
  async create(
    @Body('order') createOrderDto: Partial<IOrder>,
    @Body('payment') createPaymentDto: Partial<IPayment>,
  ) {
    return await this.orderService.create(createOrderDto, createPaymentDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<IOrder>) {
    return await this.orderService.update(id, {
      deliveryStatus: updateData.deliveryStatus,
    });
  }
}
