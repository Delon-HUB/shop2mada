import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentEntity, PaymentSchema } from './entities/payment.entity';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import {
  PaymentMethodEntity,
  PaymentMethodSchema,
} from '../paymentMethod/entities/paymentMethod.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PaymentEntity.name, schema: PaymentSchema },
      { name: PaymentMethodEntity.name, schema: PaymentMethodSchema },
    ]),
  ],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
