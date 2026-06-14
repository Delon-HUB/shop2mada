import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ERole } from '../../../shared/Types/Enums';

@Schema({ timestamps: true, collection: 'users' })
export class UserEntity {
  @Prop({ required: true })
  firstName!: string;
  @Prop()
  lastName!: string;
  @Prop({ required: false })
  photo?: string;
  @Prop({ required: true, default: ERole.CLIENT })
  role!: ERole;

  @Prop({ required: true, unique: true })
  email!: string;
  @Prop({ required: true })
  password!: string;
  @Prop({ required: false })
  otp?: string;
  @Prop({ required: false })
  otpExpiry?: Date;
  @Prop({ required: true, default: false })
  verified!: boolean;

  @Prop({ required: true, default: Date.now() })
  createdAt!: Date;
  @Prop({ required: true, default: Date.now() })
  updatedAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
