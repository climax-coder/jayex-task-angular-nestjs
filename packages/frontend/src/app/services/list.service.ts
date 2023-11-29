import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { List } from '../models/list.model';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private apiUrl = `${environment.apiUrl}/lists`;

  constructor(private http: HttpClient) {}

  addList(name: string) {
    return this.http.post<List>(this.apiUrl, { name: name });
  }

  getAllLists() {
    return this.http.get<List[]>(this.apiUrl);
  }

  getListById(id: string) {
    return this.http.get<List>(`${this.apiUrl}/${id}`);
  }

  getLowestOrderList() {
    return this.http.get<List>(`${this.apiUrl}/lowest-list`);
  }

  updateList(list: List) {
    return this.http.put<List>(`${this.apiUrl}/${list._id}`, list);
  }

  deleteList(list: List) {
    return this.http.delete(`${this.apiUrl}/${list._id}`);
  }
}
