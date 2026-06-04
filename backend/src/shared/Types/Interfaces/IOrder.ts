import { IArticle } from './IArticle';

export interface IOrderItem {
  article: string | IArticle;
  unitPrice: number;
  quantity: number;
}

export interface IOrder {
  id: string;
  orderItems: IOrderItem[];
  totalAmount: number;
  playerId: string;
  nickname: string;
  contact: string;
  deliveryStatus: string;
  createdAt: Date;
  updatedAt: Date;
}
