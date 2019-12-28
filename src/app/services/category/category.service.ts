import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  Categories: AngularFirestoreCollection<Category>;// db ref
  public allCategories = [];
  constructor(private db: AngularFirestore) {
    this.Categories = db.collection('Categories');
    this.loadCategories();
  }
  public loadCategories() {
    this.Categories.valueChanges().subscribe((data) => {
      this.allCategories = data;
    })
  }
  public addCategory(C: Category) {
    this.Categories.doc(C.category.toUpperCase().replace(/\s/g, ""))
      .set(C)
      .then((res) => {
        console.log("add Category: " + res);
      }).catch(error => {
        console.error(error);
      });
  }

}
