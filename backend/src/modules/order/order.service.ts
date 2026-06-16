import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderEntity } from './entities/order.entity';
import { IArticle, IOrder, IPayment } from '../../shared/Types/Interfaces';
import { EDeliveryStatus } from '../../shared/Types/Enums';
import { ArticleService } from '../article/article.service';
import { PaymentService } from '../payment/payment.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(OrderEntity.name)
    private readonly orderModel: Model<OrderEntity>,
    private readonly articleService: ArticleService,
    private readonly paymentService: PaymentService,
  ) {}

  async create(
    orderDto: Partial<IOrder>,
    paymentDto: Partial<IPayment>,
  ): Promise<IOrder> {
    orderDto.orderItems = await Promise.all(
      await orderDto.orderItems!.map(async (item) => {
        const article = await this.articleService.findById(
          item.article as string,
        );
        if (!article) throw new NotFoundException('ARTICLE_NOT_FOUND');
        item = {
          ...item,
          article: article._id,
          name: article.name,
          description: article.description,
          unitPrice: article.price,
        };
        return item;
      }),
    );
    orderDto.totalAmount = orderDto.orderItems.reduce(
      (result, item) => (result += item.unitPrice * item.quantity),
      0,
    );

    paymentDto.amount = orderDto.totalAmount;
    const payment = await this.paymentService.create(paymentDto);

    orderDto.payment = payment._id;
    paymentDto.amount = orderDto.totalAmount;
    orderDto.deliveryStatus = EDeliveryStatus.PENDING;
    orderDto.createdAt = new Date(Date.now());
    orderDto.updatedAt = new Date(Date.now());
    const order = await this.orderModel.create({
      ...orderDto,
      payment: orderDto.payment as string,
    });

    return {
      ...order.toObject(),
      _id: order._id.toString(),
      payment: payment,
    };
  }

  async findById(id: string): Promise<IOrder | null> {
    const order = await this.orderModel.findById(id).populate('payment').exec();
    if (!order) return null;
    return {
      ...order.toObject(),
      _id: order._id.toString(),
      payment: order.payment as unknown as IPayment,
    };
  }

  async findAll(): Promise<IOrder[]> {
    const orders = await this.orderModel.find().populate('payment').exec();
    const mappedOrders = await Promise.all(
      orders.map(async (order) => {
        const orderItems = await Promise.all(
          order.orderItems.map(async (item) => {
            const article = await this.articleService.findById(
              item.article as string,
            );
            return {
              ...item,
              article: article as IArticle,
            };
          }),
        );

        return {
          ...order.toObject(),
          _id: order._id.toString(),
          orderItems,
          payment: order.payment as unknown as IPayment,
        };
      }),
    );

    return mappedOrders;
  }

  async update(
    id: string,
    updateData: Partial<IOrder>,
  ): Promise<IOrder | null> {
    const updatedOrder = await this.orderModel
      .findByIdAndUpdate(
        id,
        {
          deliveryStatus: updateData.deliveryStatus,
          updatedAt: new Date(Date.now()),
        },
        { returnDocument: 'after' },
      )
      .exec();
    if (!updatedOrder) return null;
    return {
      ...updatedOrder.toObject(),
      _id: updatedOrder._id.toString(),
      payment: updatedOrder.payment.toString(),
    };
  }
}
