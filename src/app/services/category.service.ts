import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Item} from "../model/item";
import {tap} from "rxjs";
import {Category} from "../model/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  URL = 'assets/json/category-data.json';

  constructor(public http: HttpClient) {
  }

  category$= this.http.get<Category[]>(this.URL)
    .pipe(
      tap(data => {
        // Initialize 'selected' property for each category
        data.forEach(category => category.selected = false);
        console.log('Category: ', JSON.stringify(data));
      })
    );
}
