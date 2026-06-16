export interface IPaymentMethod {
  _id: string;
  name: string;
  phone: string;
  account_name: string;
  cover: string;
  activate: boolean;
  createdAt: Date;
  updatedAt: Date;
}
