import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category, Message} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private http: HttpClient) {
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/categories');
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`/api/categories/${id}`);
  }

  addCategory(name: string, image?: File): Observable<Category> {
    const fd = new FormData();

    if (image) {
      fd.append('image', image, image.name);
    }

    fd.append('name', name);

    return this.http.post<Category>('/api/categories', fd);
  }

  updateCategory(id: string, name: string, image?: File): Observable<Category> {
    const fd = new FormData();

    if (image) {
      fd.append('image', image, image.name);
    }

    fd.append('name', name);

    return this.http.patch<Category>(`/api/categories/${id}`, fd);
  }

  deleteCategory(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/categories/${id}`);
  }
}
