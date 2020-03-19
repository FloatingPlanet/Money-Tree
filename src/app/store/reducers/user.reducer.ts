import {Action} from '@ngrx/store';
import {User} from '../../models/user';
import * as UserActions from '../actions/user.actions';

// Section 1
const initialUserState: User = new User();

// Section 2
export function reducer(state: User = initialUserState, action: UserActions.Actions) {

  // Section 3
  switch (action.type) {
    case UserActions.ADD_TO_CART:
      // [before state, after state]
      state.cart.push(action.product);
      return state;
    case UserActions.REMOVE_FROM_CART:
      return state;
    default:
      return state;
  }
}
