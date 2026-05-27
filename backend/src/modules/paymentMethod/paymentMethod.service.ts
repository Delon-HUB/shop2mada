import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPaymentMethod } from '../../shared/Types/Interfaces';
import { PaymentMethodEntity } from './entities/paymentMethod.entity';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectModel(PaymentMethodEntity.name)
    private readonly paymentMethodModel: Model<PaymentMethodEntity>,
  ) {}

  async create(
    paymentMethod: Partial<IPaymentMethod>,
  ): Promise<IPaymentMethod> {
    paymentMethod.createdAt = new Date(Date.now());
    paymentMethod.updatedAt = new Date(Date.now());

    const createdPaymentMethod =
      await this.paymentMethodModel.create(paymentMethod);
    return {
      ...createdPaymentMethod.toObject(),
      id: createdPaymentMethod._id.toString(),
    };
  }

  async findAll(): Promise<IPaymentMethod[]> {
    const paymentMethods = await this.paymentMethodModel.find().exec();
    return paymentMethods.map((paymentMethod) => ({
      ...paymentMethod.toObject(),
      id: paymentMethod._id.toString(),
    }));
  }

  async findByName(name: string): Promise<IPaymentMethod | null> {
    const paymentMethod = await this.paymentMethodModel
      .findOne({ name })
      .exec();
    if (!paymentMethod) return null;
    return {
      ...paymentMethod.toObject(),
      id: paymentMethod._id.toString(),
    };
  }

  async findByPhone(phone: string): Promise<IPaymentMethod | null> {
    const paymentMethod = await this.paymentMethodModel
      .findOne({ phone })
      .exec();
    if (!paymentMethod) return null;
    return {
      ...paymentMethod.toObject(),
      id: paymentMethod._id.toString(),
    };
  }

  async update(
    id: string,
    updateData: Partial<IPaymentMethod>,
  ): Promise<IPaymentMethod | null> {
    updateData.updatedAt = new Date(Date.now());
    const updatedPaymentMethod = await this.paymentMethodModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    if (!updatedPaymentMethod) return null;
    return {
      ...updatedPaymentMethod.toObject(),
      id: updatedPaymentMethod._id.toString(),
    };
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.paymentMethodModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
