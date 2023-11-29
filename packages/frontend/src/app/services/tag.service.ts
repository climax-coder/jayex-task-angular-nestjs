import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Tag } from '../models/tag.model';
import { environment } from '../environment/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private apiUrl = `${environment.apiUrl}/tags`;

  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  addTag(name: string) {
    return this.http
      .post<Tag>(this.apiUrl, { name: name })
      .pipe(catchError(this.handleError));
  }

  getAllTags() {
    return this.http.get<Tag[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  updateTag(tag: Tag) {
    return this.http
      .put<Tag>(`${this.apiUrl}/${tag._id}`, tag)
      .pipe(catchError(this.handleError));
  }

  deleteTag(tag: Tag) {
    return this.http
      .delete(`${this.apiUrl}/${tag._id}`)
      .pipe(catchError(this.handleError));
  }
}
