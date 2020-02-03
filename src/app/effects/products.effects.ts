import {Injectable} from '@angular/core';
import * as cartActions from '../actions/products.actions';
import {AngularFirestore} from 'angularfire2/firestore';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {UserService} from '../services/user/user.service';
import {User} from '../models/user';
import {GetCartFail, GetCartSuccess} from '../actions/products.actions';

export type Action = cartActions.All;


@Injectable()
export class CartEffects {
  @Effect()
  loadCart$ = this.actions.pipe(ofType<Action>(cartActions.GET_CART),
    mergeMap(
      () => this.us.userOberservalbe.pipe(
        map((user: User) => new GetCartSuccess(user.cart)),
        catchError(error => of(new GetCartFail(error)))
      )
    )
  );


  constructor(private actions: Actions,
              private db: AngularFirestore,
              private us: UserService) {


  }


}
