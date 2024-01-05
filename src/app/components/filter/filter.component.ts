import { Component } from '@angular/core';
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass']
})
export class FilterComponent {

  constructor(private categoryService: CategoryService) {
  }

  categoriesData$ = this.categoryService.category$

}
