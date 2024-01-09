import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, combineLatest, EMPTY, map, shareReplay, tap} from "rxjs";
import {Item} from "../model/item";
import {CategoryService} from "./category.service";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  URL = 'assets/json/item-data.json';

  constructor(public http: HttpClient,
              private categoryService: CategoryService) {
  }

  items$ = this.http.get<Item[]>(this.URL)
    .pipe(tap((data) => console.log('Item: ', JSON.stringify)));

  categories$ = this.categoryService.category$

  public categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  categoryActionStream$ = combineLatest([
    this.items$,
    this.categorySelectedAction$,
  ]).pipe(
    map(([items, selectedCategoryId]) =>
      items.filter((item) =>
        selectedCategoryId ? item.item_categoryId == selectedCategoryId : true
      )
    ),
    catchError((err) => {
      return EMPTY;
    })
  );

  onChangedCategory(selectedCategoryId: number) {
    this.categorySelectedSubject.next(0);
    this.categorySelectedSubject.next(+selectedCategoryId);
  }

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
}

