import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, collection: 'paymentMethods' })
export class PaymentMethodEntity {
  @Prop({ required: true, transform: (v) => v.toUpperCase() })
  name!: string;

  @Prop({ required: true })
  phone!: string;

  @Prop({ required: true })
  account_name!: string;

  @Prop({ required: true })
  cover!: string;

  @Prop({ required: true, default: false })
  activate!: boolean;

  @Prop({ required: true, default: Date.now() })
  createdAt!: Date;

  @Prop({ required: true, default: Date.now() })
  updatedAt!: Date;
}

export const PaymentMethodSchema =
  SchemaFactory.createForClass(PaymentMethodEntity);
