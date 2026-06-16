import type { EPaymentStatus } from "../Enums";
import type { IPaymentMethod } from "./IPaymentMethod";

export interface IPayment {
  _id: string;
  paymentMethod: string | IPaymentMethod;
  paymentRef: string;
  amount: number;
  paymentStatus: EPaymentStatus;
  createdAt: Date;
  updatedAt: Date;
}
