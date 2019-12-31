import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  @Output() public selectedCategories = new EventEmitter<string[]>();
  existCategory(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const exist = this.cs.allCategories.some(x => x.category === control.value);
      return exist ? { 'existCategory': { value: control.value } } : null;
    };
  }
  categoryForm = this.formBuilder.group({
    category: [null, [Validators.required, this.existCategory()]],
  })

  onSelectionChange(cats: string[]) {
    this.selectedCategories.emit(cats);
  }

  constructor(private formBuilder: FormBuilder, private cs: CategoryService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.cs.addCategory(this.categoryForm.value);
    this.categoryForm.reset();
  }
}
