import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderEntity } from './entities/order.entity';
import { IOrder, IPayment } from '../../shared/Types/Interfaces';

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
    const order = await this.orderModel.create({
      ...orderDto,
      payment: orderDto.payment as string,
    });

    return {
      ...order.toObject(),
      id: order._id.toString(),
      payment: order.payment.toString(),
    };
  }

  async findById(id: string): Promise<IOrder | null> {
    const order = await this.orderModel.findById(id).populate('payment').exec();
    if (!order) return null;
    return {
      ...order.toObject(),
      id: order._id.toString(),
      payment: order.payment as unknown as IPayment,
    };
  }

  async findAll(): Promise<IOrder[]> {
    const orders = await this.orderModel.find().populate('payment').exec();
    return orders.map((order) => ({
      ...order.toObject(),
      id: order._id.toString(),
      payment: order.payment as unknown as IPayment,
    }));
  }
}
