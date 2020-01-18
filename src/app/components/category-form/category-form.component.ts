import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, ValidatorFn, Validators} from '@angular/forms';
import {CategoryService} from 'src/app/services/category/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  @Output() public selectedCategories = new EventEmitter<string[]>();
  categoryForm = this.formBuilder.group({
    category: [null, [Validators.required, this.existCategory()]],
  });

  constructor(private formBuilder: FormBuilder, private cs: CategoryService) {
  }

  ngOnInit() {
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
    this.cs.addCategory(this.categoryForm.value);
    this.categoryForm.reset();
  }
}
