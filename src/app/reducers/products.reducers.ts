import * as CartActions from '../actions/products.actions';
import {Product} from '../models/product';

export type Action = CartActions.All;

// reducer function
export function cartReducer(state: Product[], action: Action) {

  switch (action.type) {
    case CartActions.GET_CART:
      return {...state, loading: true};
    case CartActions.GET_CART_SUCCESS:
      return {...state, ...action.payload, loading: false};
    case CartActions.ADD_TO_CART:
      return {...state, ...action.payload, loading: true};
    case CartActions.ADD_SUCCESS:
      return {...state, loading: false};
    case CartActions.ADD_FAIL:
      return {...state, ...action.payload, loading: false};
    default:
      return state;
  }
}
