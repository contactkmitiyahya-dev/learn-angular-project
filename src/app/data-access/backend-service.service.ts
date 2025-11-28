import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventModel } from '../models/event';
import { ErrorServiceService } from './error-service.service';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {

  constructor(private _http: HttpClient, private errorService: ErrorServiceService) { }

  private apiEventsUrl = 'http://localhost:3000/events';

  getAllEventsFromBackend(): Observable<HttpResponse<EventModel[]>> {
    return this._http.get<EventModel[]>(this.apiEventsUrl, {
      params: { active: true, sort: 'name' },
      headers: { 'Authorization': 'Bearer123', 'content-type': 'application/json' },
      observe: 'response'
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.errorService.handleError(error); // Utilisez le ErrorService ici aussi
      })
    );
  }

  getExpensiveEvents(): Observable<EventModel[]> {
    return this._http.get<EventModel[]>(this.apiEventsUrl).pipe(
      map(events => events.filter(e => e.price > 50)),
      catchError((error) => this.errorService.handleError(error))
    );
  }

  getEventsWithTVA(): Observable<{ title: string, finalPrice: number }[]> {
    return this._http.get<EventModel[]>(this.apiEventsUrl).pipe(
      map(events => events.map(e => ({
        title: e.title,
        finalPrice: e.price * 1.2
      }))),
      catchError((error) => this.errorService.handleError(error)) // Déplacé après la fermeture de map
    );
  }
}
