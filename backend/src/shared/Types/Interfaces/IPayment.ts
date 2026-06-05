export interface IPayment {
  id: string;
  order: string;
  paymentMethod: string;
  paymentRef: string;
  amount: number;
  paymentStatus: string;
  createdAt: Date;
  updatedAt: Date;
}
