import {Injectable} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';
import {Order} from '../../models/order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private Orders: AngularFirestoreCollection<Order>;
  public allOrders: Order[];

  constructor(private db: AngularFirestore) {
    this.Orders = db.collection('Orders',
      ref => ref.orderBy('purchaseDate').limit(100));
    this.Orders.valueChanges().subscribe((orders) => {
      this.allOrders = orders;
    });
  }

  get ordersObservable() {
    return this.Orders.valueChanges();
  }

  public addOrder(order: Order) {
    return new Promise((resolve, reject) => {
      this.Orders.doc(order.orderNumber).ref.get().then((doc) => {
        this.Orders.doc(order.orderNumber)
          .set(order)
          .catch((error) => {
            console.error(error);
            reject(`Add order failed`);
          });
        resolve(`Order ${order.orderNumber}  added`);
      }).catch((error) => {
        console.error(error);
        reject(`fetch order ${order.orderNumber} failed`);
      });
    });
  }

}
