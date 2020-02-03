import {Action} from '@ngrx/store';
import {Product} from '../models/product';


export const GET_CART = 'Get Cart Item';
// action name
export const GET_CART_SUCCESS = 'Cart Item Get Success';
export const GET_CART_FAIL = 'Cart Item Get Fail';
// to tell if cart fetched success or not
export const ADD_TO_CART = 'Added To Cart';
export const ADD_SUCCESS = 'Added Success';
export const ADD_FAIL = 'Added Fail';

export class GetCart implements Action {
  readonly type = GET_CART;
  
}

// if get cart success run this
export class GetCartSuccess implements Action {
  readonly type = GET_CART_SUCCESS;

  constructor(public payload: Product[]) {
  }
}

export class GetCartFail implements Action {
  readonly type = GET_CART_FAIL;

  constructor(public error: any) {
  }
}


export class AddToCart implements Action {
  readonly type = ADD_TO_CART;

  constructor(public payload: any) {
  }
}

export class AddSuccess implements Action {
  readonly type = ADD_SUCCESS;

  constructor(public payload?: any) {
  }
}

export class AddFail implements Action {
  readonly type = ADD_FAIL;

  constructor(public  payload?: any) {
  }
}


export type All = GetCart
  | GetCartSuccess
  | AddToCart
  | AddSuccess
  | AddFail;
