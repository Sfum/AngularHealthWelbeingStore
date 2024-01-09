import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from "../../../model/category";
import {Item} from "../../../model/item";
import {ItemService} from "../../../services/item.service";

@Component({
  selector: 'app-filter-detail',
  templateUrl: './filter-detail.component.html',
  styleUrls: ['./filter-detail.component.sass']
})
export class FilterDetailComponent {

  selectedCategoryId: number | null = null

  @Input() category: Category | undefined
  @Input() item!: Item
  @Output() categoryChanged: EventEmitter<any> = new EventEmitter<any>()

  onCheckboxChanged(selectedCategoryId: number) {
    if (this.selectedCategoryId) {
      this.categoryChanged.emit(selectedCategoryId);
    } else {
      this.categoryChanged.emit(0);
    }
  }
}
