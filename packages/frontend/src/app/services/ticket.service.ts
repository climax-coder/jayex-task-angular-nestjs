import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Ticket } from '../models/ticket.model';
import { Tag } from '../models/tag.model';
import { List } from '../models/list.model';
import { environment } from '../environment/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private apiUrl = `${environment.apiUrl}/tickets`;

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

  addTicket(ticket: {
    title: string;
    list: List;
    tags?: Tag[];
    startDate?: Date;
    endDate?: Date;
  }): Observable<Ticket> {
    return this.http
      .post<Ticket>(this.apiUrl, ticket)
      .pipe(catchError(this.handleError));
  }

  getAllTickets() {
    return this.http
      .get<Ticket[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getTicketById(id: string) {
    return this.http
      .get<Ticket>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateTicket(ticket: Ticket) {
    return this.http
      .put<Ticket>(`${this.apiUrl}/${ticket._id}`, ticket)
      .pipe(catchError(this.handleError));
  }

  deleteTicket(ticket: Ticket) {
    return this.http
      .delete<Ticket>(`${this.apiUrl}/${ticket._id}`)
      .pipe(catchError(this.handleError));
  }
}
