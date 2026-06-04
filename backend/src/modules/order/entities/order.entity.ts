import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IOrderItem } from '../../../shared/Types/Interfaces';

export class OrderItem {
  @Prop({ required: true })
  article!: string;
  @Prop({ required: true, min: 1 })
  quantity!: number;
  @Prop({ required: true })
  unitPrice!: number;
}

@Schema({ timestamps: true, collection: 'orders' })
export class OrderEntity {
  @Prop({ required: true, type: [OrderItem] })
  orderItems!: IOrderItem[];

  @Prop({ required: true })
  totalAmount!: number;

  @Prop({ required: true })
  playerId!: string;
  @Prop({ required: true })
  nickname!: string;
  @Prop({ required: true })
  contact!: string;

  @Prop({ required: true })
  deliveryStatus!: string;
  @Prop({ required: true, default: Date.now() })
  createdAt!: Date;
  @Prop({ required: true, default: Date.now() })
  updatedAt!: Date;
}

export const OrderSchema = SchemaFactory.createForClass(OrderEntity);
