import {Product} from './product';
import {Order} from './order';
import {AddressInfo} from './addressInfo';

export class CartItem {
  count: number;
  item: Product;

  constructor() {
    this.count = 0;
    this.item = new Product();
  }
}

export class User {
  guest: boolean;
  uid: string;
  username: string;
  email: string;
  location?: {
    lat: number;
    lon: number;
  };
  phoneNumber: string;
  verifiedEmail: boolean;
  createdOn: Date;
  isAdmin: boolean;
  avatar: string;
  shippingInfo: AddressInfo[];
  cart: CartItem[];
  cartSize: number;
  orders: Order[];

  constructor() {
    this.guest = true;
    this.uid = '';
    this.username = '';
    this.email = '';
    this.phoneNumber = '';
    this.verifiedEmail = false;
    this.isAdmin = false;
    this.avatar = '';
    this.shippingInfo = [];
    this.cart = [];
    this.orders = [];
    this.createdOn = new Date();
    this.cartSize = 0;
  }
}

