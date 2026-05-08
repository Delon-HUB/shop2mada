import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ECategory } from '../../../shared/Types/Enums';

@Schema({ timestamps: true, collection: 'games' })
export class GameEntity {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true })
  cover!: string;

  @Prop()
  categories!: ECategory[];

  @Prop({ required: true, default: Date.now() })
  createdAt!: Date;

  @Prop({ required: true, default: Date.now() })
  updatedAt!: Date;
}

export const GameSchema = SchemaFactory.createForClass(GameEntity);
