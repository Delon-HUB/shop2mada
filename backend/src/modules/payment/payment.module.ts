import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentEntity, PaymentSchema } from './entities/payment.entity';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentMethodModule } from '../paymentMethod/paymentMethod.module';
import { PaymentMethodService } from '../paymentMethod/paymentMethod.service';
import {
  PaymentMethodEntity,
  PaymentMethodSchema,
} from '../paymentMethod/entities/paymentMethod.entity';
import { ArticleModule } from '../article/article.module';
import { ArticleService } from '../article/article.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PaymentEntity.name, schema: PaymentSchema },
      { name: PaymentMethodEntity.name, schema: PaymentMethodSchema },
    ]),
    PaymentMethodModule,
  ],
  providers: [PaymentService, PaymentMethodService],
  controllers: [PaymentController],
})
export class PaymentModule {}
