import type { IArticle } from "./IArticle";

export interface IOffer {
  id: string;
  name: string;
  description?: string;
  gameId: string;
  articles: IArticle[];
  createdAt: Date;
  updatedAt: Date;
}
