import {Product} from './product';

export class User {
  uid: string;
  username: string;
  email: string;
  location?: {
    lat: number;
    lon: number;
  };
  phoneNumber: string;
  verifiedEmail: boolean;
  createdOn?: Date;
  isAdmin: boolean;
  avatar: string;
  firstName?: string;
  lastName?: string;
  address1?: string;
  address2?: string;
  country?: string;
  state?: string;
  zip?: number;
  cart?: string[];

}
