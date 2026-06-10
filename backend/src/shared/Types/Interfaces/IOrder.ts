import { EDeliveryStatus } from '../Enums';
import { IArticle } from './IArticle';
import { IPayment } from './IPayment';

export interface IOrderItem {
  article: string | IArticle;
  unitPrice: number;
  quantity: number;
}

export interface IOrder {
  _id: string;
  orderItems: IOrderItem[];
  totalAmount: number;
  playerId: string;
  nickname: string;
  contact: string;
  payment: string | IPayment;
  deliveryStatus: EDeliveryStatus;
  createdAt: Date;
  updatedAt: Date;
}
