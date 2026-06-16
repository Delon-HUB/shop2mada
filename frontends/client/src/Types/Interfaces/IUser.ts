import { ERole } from '../Enums';

export interface IUser {
  _id?: string;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  otp?: string | null;
  otpExpiry?: Date | null;
  role: ERole;
  photo?: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
