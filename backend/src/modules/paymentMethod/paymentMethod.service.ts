import { Injectable, NotFoundException } from '@nestjs/common';
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
    const p = await this.findByPhone(paymentMethod.phone!);
    if (p) throw new NotFoundException('Payment method already exists');
    paymentMethod.activate = false;
    paymentMethod.createdAt = new Date(Date.now());
    paymentMethod.updatedAt = new Date(Date.now());

    const createdPaymentMethod =
      await this.paymentMethodModel.create(paymentMethod);
    return {
      ...createdPaymentMethod.toObject(),
      _id: createdPaymentMethod._id.toString(),
    };
  }

  async findById(id: string): Promise<IPaymentMethod | null> {
    const paymentMethod = await this.paymentMethodModel.findById(id);
    return paymentMethod
      ? { ...paymentMethod, _id: paymentMethod._id.toString() }
      : null;
  }

  async findAll(activate: boolean): Promise<IPaymentMethod[]> {
    const paymentMethods = await this.paymentMethodModel
      .find(activate ? { activate: true } : {})
      .exec();
    return paymentMethods.map((paymentMethod) => ({
      ...paymentMethod.toObject(),
      _id: paymentMethod._id.toString(),
    }));
  }

  async findByName(name: string): Promise<IPaymentMethod | null> {
    const paymentMethod = await this.paymentMethodModel
      .findOne({ name })
      .exec();
    if (!paymentMethod) return null;
    return {
      ...paymentMethod.toObject(),
      _id: paymentMethod._id.toString(),
    };
  }

  async findByPhone(phone: string): Promise<IPaymentMethod | null> {
    const paymentMethod = await this.paymentMethodModel
      .findOne({ phone })
      .exec();
    if (!paymentMethod) return null;
    return {
      ...paymentMethod.toObject(),
      _id: paymentMethod._id.toString(),
    };
  }

  async update(
    id: string,
    updateData: Partial<IPaymentMethod>,
  ): Promise<IPaymentMethod | null> {
    updateData.updatedAt = new Date(Date.now());
    const updatedPaymentMethod = await this.paymentMethodModel
      .findByIdAndUpdate(id, updateData, { returnDocument: 'after' })
      .exec();
    if (!updatedPaymentMethod) return null;
    return {
      ...updatedPaymentMethod.toObject(),
      _id: updatedPaymentMethod._id.toString(),
    };
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.paymentMethodModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
