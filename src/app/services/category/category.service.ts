import {Injectable} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection, Query,
} from 'angularfire2/firestore';
import {Category} from 'src/app/models/category';
import {Product} from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // reference for all categories
  public CategoriesCollection: AngularFirestoreCollection<Category>; // db ref
  public chosenCategoryCollection: AngularFirestoreCollection<Category>; // db ref
  // all categories
  public allCategories = [];
  // products for chosen category
  public chosenCategoryProducts: Product[] = [];
  // current chosen category
  public chosenCategory: string;
  public loading = false;
  private lastDoc: any;
  // query for lazing loading
  private productFetchQuery: Query;


  constructor(private db: AngularFirestore) {
    this.CategoriesCollection = db.collection('Categories');
    this.loadCategories();
  }

  /*
  retrieve all categories from firebase
   */
  public loadCategories() {
    this.categoriesObservableAdmin.subscribe((data) => {
      this.allCategories = data;
    });
  }

  /*
retrieve specific products based on given category with @limit
 */
  public getProductsWithCategory(C: string) {
    return new Promise((res, rej) => {
      this.chosenCategory = C;
      this.chosenCategoryCollection = this.CategoriesCollection
        .doc(this.chosenCategory.toUpperCase())
        .collection('products');
      this.productFetchQuery = this.chosenCategoryCollection.ref.limit(4);
      this.productFetchQuery.get().then((products) => {
        products.forEach((doc) => {
          this.chosenCategoryProducts.push(doc.data() as Product);
          this.lastDoc = doc;
        });
      });
      res();
    });
  }

  /*
  * retrieve @limit more products from firebase
   */
  public loadAnotherProducts() {
    const lazyLoad = new Promise((res, rej) => {
      this.loading = true;
      setTimeout(() => {
        this.productFetchQuery = this.chosenCategoryCollection.ref.limit(4).startAfter(this.lastDoc);
        this.productFetchQuery.get().then((products) => {
          products.forEach((doc) => {
            this.chosenCategoryProducts.push(doc.data() as Product);
            this.lastDoc = doc;
          });
        });
      }, 1000);
    });
  }

  /*
  return categories observable
   */
  get categoriesObservableAdmin() {
    return this.CategoriesCollection.valueChanges();
  }

  /*
  add category to firebase
   */
  public addCategory(C: Category) {
    return new Promise((resolve, reject) => {
      this.CategoriesCollection.doc(C.category.toUpperCase().replace(/\s/g, ''))
        .set(C)
        .then((res) => {
          console.log('add Category: ' + C.category);
          resolve(C.category);
        }).catch(error => {
        reject(error);
        console.error(error);
      });
    });
  }

  /*
  add product to its category collections
   */
  public addProductToCategory(C: string, P: Product) {
    const subCategories = this.CategoriesCollection.doc(C.toUpperCase().replace(/\s/g, '')).collection('products');
    subCategories.doc(P.SKU).set(P).then((res) => {
      console.log(`add ${P.SKU} to Collection ${C} succeeded!`);
    }).catch((error) => {
      console.error(error);
    });
  }


}
