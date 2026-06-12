import type { EDeliveryStatus } from "../Enums";
import type { IArticle } from "./IArticle";
import type { IPayment } from "./IPayment";

export interface IOrderItem {
  article: string | IArticle;
  name: string;
  description?: string;
  unitPrice: number;
  quantity: number;
}

export interface IOrder {
  _id: string;
  orderItems: IOrderItem[];
  payment: string | IPayment;
  totalAmount: number;
  playerId: string;
  nickname: string;
  contact: string;
  deliveryStatus: EDeliveryStatus;
  createdAt: Date;
  updatedAt: Date;
}
