import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GameEntity } from '../../game/entities/game.entity';
import { SchemaTypes, type ObjectId } from 'mongoose';

@Schema({ timestamps: true, collection: 'offers' })
export class OfferEntity {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: GameEntity.name })
  gameId!: ObjectId | string;

  @Prop({ required: true, default: Date.now() })
  createdAt!: Date;

  @Prop({ required: true, default: Date.now() })
  updatedAt!: Date;
}

export const OfferSchema = SchemaFactory.createForClass(OfferEntity);
