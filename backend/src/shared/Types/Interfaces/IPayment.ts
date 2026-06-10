import { EPaymentStatus } from '../Enums';

export interface IPayment {
  _id: string;
  paymentMethod: string;
  paymentRef: string;
  amount: number;
  paymentStatus: EPaymentStatus;
  createdAt: Date;
  updatedAt: Date;
}
