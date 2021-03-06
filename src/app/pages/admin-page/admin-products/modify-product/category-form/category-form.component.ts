import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {FormBuilder, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
import {CategoryService} from 'src/app/services/category/category.service';
import {Category} from 'src/app/models/category';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  @Output() public selectedCategories = new EventEmitter<string[]>();
  public allCategories: Category[];
  private categoriesObservable$: Subscription;
  public dummyHolder: any;
  public succeeded = false;

  constructor(private formBuilder: FormBuilder, private cs: CategoryService) {

  }

  categoryForm = this.formBuilder.group({
    category: [null, [Validators.required, this.existCategory()]],
  });

  ngOnInit() {
    this.categoriesObservable$ = this.cs.categoriesObservableAdmin.subscribe((res) => {
      this.allCategories = res;
    });
  }

  existCategory(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const exist = this.cs.allCategories.some(x => x.category === control.value);
      return exist ? {existCategory: {value: control.value}} : null;
    };
  }

  onSelectionChange(cats: string[]) {
    this.selectedCategories.emit(cats);
  }

  onSubmit() {
    this.succeeded = true;
    // show loading spinner
    this.cs.addCategory(this.categoryForm.value).then((res) => {
      setTimeout(() => {
        this.succeeded = false;
      }, 300);
    });
    this.categoryForm.reset();
  }

  ngOnDestroy(): void {
    if (this.categoriesObservable$) {
      this.categoriesObservable$.unsubscribe();
    }
  }
}
