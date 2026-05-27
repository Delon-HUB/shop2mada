import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OfferModule } from '../offer/offer.module';
import {
  PaymentMethodEntity,
  PaymentMethodSchema,
} from './entities/paymentMethod.entity';
import { PaymentMethodService } from './paymentMethod.service';
import { PaymentMethodController } from './paymentMethod.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PaymentMethodEntity.name, schema: PaymentMethodSchema },
    ]),
    OfferModule,
  ],
  providers: [PaymentMethodService],
  controllers: [PaymentMethodController],
})
export class PaymentMethodModule {}
