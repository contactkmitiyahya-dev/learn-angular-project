import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {

  constructor(private _http : HttpClient) { }
  private apiEventsUrl = 'http://localhost:3000/events';

  getAllEventsFromBackend():Observable<HttpResponse<Event[]>>{
    return this._http.get<Event[]>(this.apiEventsUrl,
      {params:{active:true , sort:'name'},
      headers:{'Authorisation':'Bearer123','content-type':'application/json'},
      observe:'response'
      }).pipe(
        catchError((error :HttpErrorResponse)=>{
          return throwError(() => error)
        })
      )
  }
}
