import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  Categories: AngularFirestoreCollection<Category>;// db ref
  public allCategories = [];
  public selectedCategories = new Subject<string[]>();
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
  public setCategories(Cs: string[]) {
    this.selectedCategories.next(Cs);
  }
  public getCategories(): Observable<string[]> {
    return this.selectedCategories.asObservable();
  }

}
