import { Component } from '@angular/core';
import {ItemService} from "../../services/item.service";

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.sass']
})
export class ItemCardComponent {

  constructor(private itemService: ItemService) {
  }

  itemsFetched$ = this.itemService.itemsFiltered$

}
