import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorServiceService {

  constructor() { }
  handleError(error: HttpErrorResponse) {
    let message = '';
    if (error.error instanceof ErrorEvent) {
      message = `Erreur réseau : ${error.error.message}`;
    } else {
      message = `Erreur serveur (${error.status}) : ${error.message}`;
    }
    console.log(message);
    return throwError(() => message);
  }
}
