import { IArticle } from "./IArticle";

export interface IOffer {
  id: string;
  name: string;
  description: string;
  price: number;
  gameId: string;
  articles: IArticle[];
  createdAt: Date;
  updatedAt: Date;
}
