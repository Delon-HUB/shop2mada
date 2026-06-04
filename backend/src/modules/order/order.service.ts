import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderEntity } from './entities/order.entity';
import { IOrder } from '../../shared/Types/Interfaces';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(OrderEntity.name)
    private readonly orderModel: Model<OrderEntity>,
  ) {}

  async create(orderDto: Partial<IOrder>): Promise<IOrder> {
    orderDto.deliveryStatus = 'PENDING';
    orderDto.createdAt = new Date(Date.now());
    orderDto.updatedAt = new Date(Date.now());
    const order = await this.orderModel.create(orderDto);
    return {
      ...order.toObject(),
      id: order._id.toString(),
    };
  }
}
