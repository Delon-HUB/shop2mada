import { ECategory } from "../Enums";
import type { IOffer } from "./IOffer";

export interface IGame {
  id: string;
  name: string;
  description?: string;
  cover: string;
  categories: ECategory[];
  offers: IOffer[];
  createdAt: Date;
  updatedAt: Date;
}
