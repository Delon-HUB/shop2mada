import type { IArticle } from './IArticle';

export interface IOffer {
  _id: string;
  name: string;
  description?: string;
  gameId: string;
  articles: IArticle[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
