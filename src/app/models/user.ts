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
  cart?: Product[];
  orders?: Order[];
}
