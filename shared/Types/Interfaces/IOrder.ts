import type { IArticle } from "./IArticle";
import type { IPayment } from "./IPayment";

export interface IOrderItem {
  article: string | IArticle;
  unitPrice: number;
  quantity: number;
}

export interface IOrder {
  id: string;
  orderItems: IOrderItem[];
  payment: string | IPayment;
  totalAmount: number;
  playerId: string;
  nickname: string;
  contact: string;
  deliveryStatus: string;
  createdAt: Date;
  updatedAt: Date;
}
