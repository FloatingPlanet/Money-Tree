// Section 1
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Product} from '../../models/product';

export const ADD_TO_CART = '[PRODUCT] Add';
export const REMOVE_FROM_CART = '[PRODUCT] Remove';

export class AddProduct implements Action {
  readonly type = ADD_TO_CART;

  constructor(public product: Product) {
  }
}

export class RemoveProduct implements Action {
  readonly type = REMOVE_FROM_CART;

  constructor(public product: Product) {
  }
}


export type Actions = AddProduct | RemoveProduct;
