import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderEntity, OrderSchema } from './entities/order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import {
  ArticleEntity,
  ArticleSchema,
} from '../article/entities/article.entity';
import { ArticleModule } from '../article/article.module';
import { ArticleService } from '../article/article.service';
import {
  PaymentEntity,
  PaymentSchema,
} from '../payment/entities/payment.entity';
import { PaymentModule } from '../payment/payment.module';
import { PaymentService } from '../payment/payment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderEntity.name, schema: OrderSchema },
      { name: ArticleEntity.name, schema: ArticleSchema },
      { name: PaymentEntity.name, schema: PaymentSchema },
    ]),
    ArticleModule,
    PaymentModule,
  ],
  providers: [OrderService, ArticleService, PaymentService],
  controllers: [OrderController],
})
export class OrderModule {}
