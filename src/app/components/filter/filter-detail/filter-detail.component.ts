import {Component, Input} from '@angular/core';
import {Category} from "../../../model/category";

@Component({
  selector: 'app-filter-detail',
  templateUrl: './filter-detail.component.html',
  styleUrls: ['./filter-detail.component.sass']
})
export class FilterDetailComponent {

  @Input()
  category: Category | undefined

}
