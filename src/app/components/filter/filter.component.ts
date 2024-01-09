import {Component} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {ItemService} from "../../services/item.service";
import {Item} from "../../model/item";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass']
})
export class FilterComponent {
  categoryChangedEvent: any;

  constructor(private categoryService: CategoryService,
              private itemService: ItemService) {
  }

  categoriesData$ = this.categoryService.category$

  categoryChange(selectedCategoryId: number) {
    this.itemService.onChangedCategory(selectedCategoryId)

  }
}
