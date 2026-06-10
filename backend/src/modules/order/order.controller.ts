import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { IArticle, IOrder, IPayment } from '../../shared/Types/Interfaces';
import { ArticleService } from '../article/article.service';
import { OrderService } from './order.service';
import { PaymentService } from '../payment/payment.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly articleService: ArticleService,
    private readonly paymentService: PaymentService,
  ) {}

  @Get()
  async findAll() {
    const orders = await this.orderService.findAll();
    const orderWithPaymentList = Promise.all(
      orders.map(async (order) => {
        order.orderItems = await Promise.all(
          await order.orderItems.map(async (item) => {
            item.article = (await this.articleService.findById(
              item.article as string,
            )) as IArticle;
            return item;
          }),
        );
        return order;
      }),
    );
    return (await orderWithPaymentList).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }

  @Post()
  async create(
    @Body('order') createOrderDto: Partial<IOrder>,
    @Body('payment') createPaymentDto: Partial<IPayment>,
  ) {
    const orderItems = await Promise.all(
      await createOrderDto.orderItems!.map(async (item) => {
        const article = await this.articleService.findById(
          item.article as string,
        );
        if (!article) return;
        item.unitPrice = article.price;
        return item;
      }),
    );
    createOrderDto.orderItems = orderItems.filter((item) => item !== undefined);
    createOrderDto.totalAmount = createOrderDto.orderItems.reduce(
      (result, item) => (result += item.unitPrice * item.quantity),
      0,
    );
    createPaymentDto.amount = createOrderDto.totalAmount;
    const payment = await this.paymentService.create(createPaymentDto);
    createOrderDto.payment = payment._id;
    const order = await this.orderService.create(createOrderDto);
    createPaymentDto.amount = createOrderDto.totalAmount;
    return {
      order,
      payment,
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<IOrder>) {
    return await this.orderService.update(id, {
      deliveryStatus: updateData.deliveryStatus,
    });
  }
}
