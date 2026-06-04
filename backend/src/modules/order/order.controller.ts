import { Body, Controller, Get, Post } from '@nestjs/common';
import { IOrder, IPayment } from '../../shared/Types/Interfaces';
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
    return 'hello from order';
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
    const order = await this.orderService.create(createOrderDto);
    createPaymentDto.amount = 0;
    const payment = await this.paymentService.create(createPaymentDto);

    return {
      order,
      payment,
    };
  }
}
