import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, type ObjectId } from 'mongoose';
import { OfferEntity } from '../../offer/entities/offer.entity';

@Schema({ timestamps: true, collection: 'articles' })
export class ArticleEntity {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true })
  price!: number;

  @Prop()
  badge?: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: OfferEntity.name })
  offerId!: ObjectId | string;

  @Prop({ required: true, default: Date.now() })
  createdAt!: Date;

  @Prop({ required: true, default: Date.now() })
  updatedAt!: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(ArticleEntity);
