import {Product} from './product';
import {Order} from './order';
import {AddressInfo} from './addressInfo';

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
  shippingInfo: AddressInfo[];
  firstName?: string;
  lastName?: string;
  address1?: string;
  address2?: string;
  country?: string;
  state?: string;
  zip?: number;
  cart?: Product[];
  orders?: Order[];
}
