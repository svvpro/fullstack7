import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../shared/services/category.service";
import {Observable} from "rxjs";
import {Category} from "../shared/interfaces";

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {

  categories$: Observable<Category[]>;

  constructor(private cs: CategoryService) { }

  ngOnInit() {
    this.categories$ = this.cs.getAllCategories();
  }

}
