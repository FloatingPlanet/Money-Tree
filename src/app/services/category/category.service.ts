import {Injectable} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';
import {Category} from 'src/app/models/category';
import {Product} from '../../models/product';
import Query = firebase.firestore.Query;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // reference for all categories
  private CategoriesCollection: AngularFirestoreCollection<Category>; // db ref
  // current chosen category
  private chosenCategory: string;
  // query for lazing loading

  // all categories
  public allCategories = [];
  // products for chosen category
  public chosenCategoryProducts: Product[] = [];
  public loading = false;

  // beta testing
  /*
  * use map to store all loaded products, category : { products: Product[];
  * lastDoc // this is the flag for lazy loading
  * }
  * so we dont have to retrieve products from firebase which will increase documents read
   */

  public productMap: {
    [cat: string]: {
      products: Product[];
      query: Query;
      lastDoc: any
    }
  } = {};

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
      let chosenCategoryCollection: Query;
      let lastDoc: any;
      // check if this category products has been loaded, if so grab it from map
      if (this.productMap.hasOwnProperty(C)) {
        // update local var
        this.chosenCategoryProducts = this.productMap[C].products;
        chosenCategoryCollection = this.productMap[C].query;
        lastDoc = this.productMap[C].lastDoc;
      } else {
        // clear chosenCategoryProducts when use switch around
        this.chosenCategoryProducts = [];
        // chosenCategoryCollection = this.CategoriesCollection
        //   .doc(this.chosenCategory.toUpperCase())
        //   .collection('products');

        // const productFetchQuery = chosenCategoryCollection.ref.limit(4);
        const productFetchQuery = this.db.collection('Products').ref.
        where('productCategory', 'array-contains', this.chosenCategory.toUpperCase()).limit(4);
        productFetchQuery.get().then((products) => {
          products.forEach((doc) => {
            this.chosenCategoryProducts.push(doc.data() as Product);
            lastDoc = doc;
            // create new entry in map
            this.productMap[C] = Object.assign({
              products: this.chosenCategoryProducts,
              query: productFetchQuery,
              lastDoc
            });
          });
        }).catch((err) => {
          rej(err);
        });
      }
      res();
    });
  }

  /*
  * retrieve @limit more products from firebase
   */
  public loadAnotherProducts() {
    return new Promise((res, rej) => {
      this.loading = true;
      const chosenCategoryCollection = this.productMap[this.chosenCategory].query;
      let lastDoc = this.productMap[this.chosenCategory].lastDoc;
      setTimeout(() => {
        const productFetchQuery = chosenCategoryCollection.startAfter(lastDoc);
        productFetchQuery.get().then((products) => {
          products.forEach((doc) => {
            this.chosenCategoryProducts.push(doc.data() as Product);
            lastDoc = doc;
            // update cursor for next lazy load
            this.productMap[this.chosenCategory].lastDoc = Object.assign(lastDoc);
          });
        }).catch((err) => rej(err));
      }, 500);
      res();
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
        .then(() => {
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
    subCategories.doc(P.SKU).set(P).then(() => {
      console.log(`add ${P.SKU} to Collection ${C} succeeded!`);
    }).catch((error) => {
      console.error(error);
    });
  }


}
