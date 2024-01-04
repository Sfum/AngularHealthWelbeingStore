import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Item} from "../model/item";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  URL = 'assets/json/item-data.json';

  constructor(public http: HttpClient) {
  }

  items$ = this.http.get<Item[]>(this.URL)
    .pipe(tap((data) => console.log('Item: ', JSON.stringify)));
}