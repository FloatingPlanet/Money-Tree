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
// export class Product {
//   SKU: string;
//   productId: number;
//   productName: string;
//   productCategory: [string];
//   productPrice: number;
//   productDescription: string;
//   productImageUrls: [string];
//   productAddedAt: Date;
//   productQuantity: number;
//   ratings: number;
//   favourite: boolean;
//   productSeller?: string;
// }
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
    product.productSummary = product.productCategory.join(" ");
    this.Products.doc(product.SKU)
      // TODO check doc exsits or not
      .set(product)
      .then((res) => {
        console.log(res);
      }).catch(error => {
        console.error(error);
      });
  }
}
