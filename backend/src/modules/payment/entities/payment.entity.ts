import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type ObjectId, SchemaTypes } from 'mongoose';
import { PaymentMethodEntity } from '../../paymentMethod/entities/paymentMethod.entity';
import { OrderEntity } from '../../order/entities/order.entity';

@Schema({ timestamps: true, collection: 'payments' })
export class PaymentEntity {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: OrderEntity.name })
  order!: ObjectId | string;
  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: PaymentMethodEntity.name,
  })
  paymentMethod!: ObjectId | string;
  @Prop({ required: true })
  paymentRef!: string;
  @Prop({ required: true })
  amount!: number;

  @Prop({ required: true })
  paymentStatus!: string;
  @Prop({ required: true, default: Date.now() })
  createdAt!: Date;
  @Prop({ required: true, default: Date.now() })
  updatedAt!: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(PaymentEntity);
