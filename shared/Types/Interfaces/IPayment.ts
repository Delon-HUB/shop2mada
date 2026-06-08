import type { IPaymentMethod } from "./IPaymentMethod";

export interface IPayment {
  id: string;
  paymentMethod: string | IPaymentMethod;
  paymentRef: string;
  amount: number;
  paymentStatus: string;
  createdAt: Date;
  updatedAt: Date;
}
