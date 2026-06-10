export interface IArticle {
  _id: string;
  name: string;
  description?: string;
  price: number;
  offerId: string;
  badge?: string;
  createdAt: Date;
  updatedAt: Date;
}
