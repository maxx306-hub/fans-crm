import { CommonDBValues } from './common.type';

export interface User {
  id: number;
  phone: string;
  email: string;
}

export type UserLoginResponse = {
  user: User & CommonDBValues;
  token: string;
};
