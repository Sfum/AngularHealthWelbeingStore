import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, combineLatest, EMPTY, map, shareReplay, tap } from "rxjs";
import { catchError } from "rxjs/operators";
import { Item } from "../model/item";
import { CategoryService } from "./category.service";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  URL = 'assets/json/item-data.json';

  constructor(public http: HttpClient) {
  }

  items$ = this.http.get<Item[]>(this.URL)
    .pipe(tap((data) => console.log('Item: ', JSON.stringify(data))));

  categories$ = this.categoryService.category$;

  public categorySelectedSubject = new BehaviorSubject<number[]>([]);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  onChangedCategory(selectedCategoryId: number) {
    const selectedCategories = this.categorySelectedSubject.value.slice();
    const index = selectedCategories.indexOf(selectedCategoryId);

    if (index !== -1) {
      selectedCategories.splice(index, 1); // Remove if already selected
    } else {
      selectedCategories.push(selectedCategoryId); // Add if not selected
    }

    this.categorySelectedSubject.next(selectedCategories);
  }

  categoryActionStream$ = combineLatest([
    this.items$,
    this.categorySelectedAction$,
  ]).pipe(
    map(([items, selectedCategoryIds]) => {
      return items.filter((item) =>
        selectedCategoryIds.length === 0 || selectedCategoryIds.includes(item.item_categoryId)
      );
    }),
    catchError((err) => {
      return EMPTY;
    })
  );

  itemsFiltered$ = combineLatest([
    this.categoryActionStream$,
    this.categories$,
  ]).pipe(
    map(([products, categories]) =>
      products.map(
        (product) =>
          ({
            ...product,
            categoryId: categories.find((c) => product.item_categoryId === c.id)?.['category_name'],
          } as unknown as Item)
      )
    ),
    shareReplay(1)
  );


  selectedItems$ = this.itemsFiltered$.pipe(
    map(filteredItems => filteredItems.filter(item => item.item_categoryId))
  );
}
