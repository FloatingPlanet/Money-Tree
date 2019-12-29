import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Product } from 'src/app/models/product';
import { Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  Products: AngularFirestoreCollection<Product>;// db ref
  public allProducts: Product[];
  constructor(private db: AngularFirestore) {
    this.Products = db.collection('Products');
    this.loadProducts();
  }
  public loadProducts() {
    this.Products.valueChanges().subscribe((data) => {
      this.allProducts = data;
    });
  }
  public addProduct(product: Product) {
    return new Promise((resolve, reject) => {
      product.productSummary = product.productCategory.join(" ");
      this.Products.doc(product.SKU).ref.get().then((doc) => {
        if (doc.exists) {
          reject(`SKU: ${product.SKU} exists`);
        } else {
          this.Products.doc(product.SKU)
            .set(product)
            .then((res) => {
              console.log("add Product: " + res);
            }).catch(error => {
              console.error(error);
            });
          resolve('Added');
        }
      }).catch((error) => {
        console.error(error);
      })
    })

  }
}
