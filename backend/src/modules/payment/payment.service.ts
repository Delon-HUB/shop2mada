import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentEntity } from './entities/payment.entity';
import { IPayment } from '../../shared/Types/Interfaces';
import { EPaymentStatus } from '../../shared/Types/Enums';
import { PaymentMethodEntity } from '../paymentMethod/entities/paymentMethod.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(PaymentEntity.name)
    private readonly paymentModel: Model<PaymentEntity>,
    @InjectModel(PaymentMethodEntity.name)
    private readonly paymentMethodModel: Model<PaymentMethodEntity>,
  ) {}

  async create(paymentDto: Partial<IPayment>): Promise<IPayment> {
    const pm = await this.paymentMethodModel.findById(paymentDto.paymentMethod);
    if (!pm) throw new NotFoundException('PAYMENT_METHOD_NOT_FOUND');

    paymentDto.paymentStatus = EPaymentStatus.PENDING;
    paymentDto.createdAt = new Date(Date.now());
    paymentDto.updatedAt = new Date(Date.now());
    const payment = await this.paymentModel.create(paymentDto);
    return {
      ...payment.toObject(),
      paymentMethod: payment.paymentMethod.toString(),
      _id: payment._id.toString(),
    };
  }

  async findById(id: string): Promise<IPayment | null> {
    const payment = await this.paymentModel.findById(id).exec();
    if (!payment) return null;
    return {
      ...payment.toObject(),
      _id: payment._id.toString(),
      paymentMethod: payment.paymentMethod.toString(),
    };
  }

  async findAll(): Promise<IPayment[]> {
    const payments = await this.paymentModel.find().exec();
    return payments.map((payment) => ({
      ...payment.toObject(),
      _id: payment._id.toString(),
      paymentMethod: payment.paymentMethod.toString(),
    }));
  }

  async update(
    id: string,
    updateData: Partial<IPayment>,
  ): Promise<IPayment | null> {
    updateData.updatedAt = new Date(Date.now());
    const updatedPayment = await this.paymentModel
      .findByIdAndUpdate(id, updateData, { returnDocument: 'after' })
      .exec();
    if (!updatedPayment) return null;
    return {
      ...updatedPayment.toObject(),
      _id: updatedPayment._id.toString(),
      paymentMethod: updatedPayment.toString(),
    };
  }
}
