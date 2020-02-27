import {Injectable} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';
import {Category} from 'src/app/models/category';
import {Product} from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public Categories: AngularFirestoreCollection<Category>; // db ref
  public allCategories = [];

  constructor(private db: AngularFirestore) {
    this.Categories = db.collection('Categories');
    this.loadCategories();
  }

  /*
  retrieve all categories from firebase
   */
  public loadCategories() {
    this.categoriesObservable.subscribe((data) => {
      this.allCategories = data;
    });
  }

  /*
  return categories observable
   */
  get categoriesObservable() {
    return this.Categories.valueChanges();
  }

  /*
  add category to firebase
   */
  public addCategory(C: Category) {
    return new Promise((resolve, reject) => {
      this.Categories.doc(C.category.toUpperCase().replace(/\s/g, ''))
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
    const subCategories = this.Categories.doc(C.toUpperCase().replace(/\s/g, '')).collection('products');
    subCategories.doc(P.SKU).set(P).then((res) => {
      console.log(`add ${P.SKU} to Collection ${C} succeeded!`);
    }).catch((error) => {
      console.error(error);
    });
  }

  /*
  load specific products based on given category
   */
  public specificCategoryProductsObservable(C: string) {
    return this.db.collection('Categories/' + C + '/products').valueChanges();
  }
}
