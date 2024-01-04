import {Component, Input} from '@angular/core';
import {Item} from "../../../model/item";

@Component({
  selector: 'app-item-card-detail',
  templateUrl: './item-card-detail.component.html',
  styleUrls: ['./item-card-detail.component.sass']
})
export class ItemCardDetailComponent {

  @Input()
  item: Item | undefined

}
