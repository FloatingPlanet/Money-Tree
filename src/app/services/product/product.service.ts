import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, Query} from 'angularfire2/firestore';
import {Product} from 'src/app/models/product';
import {CategoryService} from '../category/category.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public Products: AngularFirestoreCollection<Product[]>; // db ref
  public allProducts: Product[] = [];
  private lastDoc: any;
  private productFetchQuery: Query;

  constructor(private db: AngularFirestore, private cs: CategoryService) {
    this.Products = db.collection('Products', ref => ref.orderBy('productAddedAt'));
    // TODO PAGINATION
    this.loadProducts();
  }

  /*
  retrieve @limit products from firebase
   */
  private loadProducts() {
    this.productFetchQuery = this.Products.ref.limit(1);
    this.productFetchQuery.get().then((products) => {
      products.forEach((doc) => {
        this.allProducts.push(doc.data() as Product);
        this.lastDoc = doc;
      });
    });
  }

  /*
  retrieve @limit more products from firebase
   */
  public loadAnotherDocs() {
    this.productFetchQuery = this.Products.ref.limit(1).startAfter(this.lastDoc);
    this.productFetchQuery.get().then((products) => {
      products.forEach((doc) => {
        this.allProducts.push(doc.data() as Product);
        this.lastDoc = doc;
      });
    });

  }

  /*
  return products observable
   */
  get productsObservableAdmin() {
    return this.Products.valueChanges();
  }

  public addProduct(product: Product) {
    return new Promise((resolve, reject) => {
      product.productSummary = product.productCategory.join(' ');
      this.Products.doc(product.SKU).ref.get().then((doc) => {
        this.Products.doc(product.SKU)
          .set(product)
          .catch(error => {
            console.error(error);
            reject('Add product failed');
          });
        resolve(`doc ${product.SKU} added`);
        product.productCategory.forEach(c => this.cs.addProductToCategory(c, product));
      }).catch((error) => {
        console.error(error);
        reject(`fetch doc ${product.SKU} failed`);
      });
    });
  }

  /*
  delete @sku from firebase
   */
  public deleteProducts(sku: string) {
    return new Promise((resolve, reject) => {
      this.Products.doc(sku).delete().then((res) => {
        resolve(`remove SKU ${sku} succeed`);
      }).catch((error) => {
        console.error(error);
        reject(`remove SKU ${sku} failed`);
      });
    });
  }

  /*
  retrieve @sku product from firebase
   */
  public fetchProduct(sku: string) {
    return new Promise((resolve, reject) => {
      this.Products.doc(sku).ref.get().then((doc) => {
        if (doc.exists) {
          resolve(doc.data());
        } else {
          reject(`${sku} does not exist`);
        }
      }).catch((error) => {
        console.error(error);
        reject(`fetch doc ${sku} failed`);
      });
    });
  }
}
