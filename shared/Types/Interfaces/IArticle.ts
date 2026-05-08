export interface IArticle {
  id: string;
  name: string;
  description?: string;
  price: number;
  gameId: string;
  badge?: string;
  createdAt: Date;
  updatedAt: Date;
}
