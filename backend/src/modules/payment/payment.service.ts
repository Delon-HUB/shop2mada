import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentEntity } from './entities/payment.entity';
import { IPayment } from '../../shared/Types/Interfaces';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(PaymentEntity.name)
    private readonly paymentModel: Model<PaymentEntity>,
  ) {}

  async create(paymentDto: Partial<IPayment>): Promise<IPayment> {
    paymentDto.paymentStatus = 'PENDING';
    paymentDto.createdAt = new Date(Date.now());
    paymentDto.updatedAt = new Date(Date.now());

    const payment = await this.paymentModel.create(paymentDto);
    return {
      ...payment.toObject(),
      paymentMethod: payment.paymentMethod.toString(),
      id: payment._id.toString(),
    };
  }

  async findById(id: string): Promise<IPayment | null> {
    const payment = await this.paymentModel.findById(id).exec();
    if (!payment) return null;
    return {
      ...payment.toObject(),
      id: payment._id.toString(),
      paymentMethod: payment.paymentMethod.toString(),
    };
  }

  async findAll(): Promise<IPayment[]> {
    const payments = await this.paymentModel.find().exec();
    return payments.map((payment) => ({
      ...payment.toObject(),
      id: payment._id.toString(),
      paymentMethod: payment.paymentMethod.toString(),
    }));
  }
}
