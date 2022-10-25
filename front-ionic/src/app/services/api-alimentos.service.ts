//api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Alimento } from '../models/alimento';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiAlimentosService {

  // API path
  base_path = 'http://localhost:8000/api/alimentos';

  constructor(private http: HttpClient) { }

  public auth_token = localStorage.getItem('data_token');

  
  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.auth_token}`
      })
    } 
  }
  

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
 
    return throwError(
      'Something bad happened; please try again later.');
  };


  createItem(item): Observable<Alimento> {
    
    return this.http      
      .post<Alimento>(this.base_path, JSON.stringify(item), this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getItem(id): Observable<Alimento> {
    return this.http
      .get<Alimento>(this.base_path + '/' + id, this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getList(): Observable<Alimento> { 
       
 
     return this.http
      .get<Alimento>(this.base_path+ '/listar', this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )

  }

  updateItem(id, item): Observable<Alimento> {
    return this.http
      .put<Alimento>(this.base_path + '/' + id, JSON.stringify(item), this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  deleteItem(id) {
    return this.http
      .delete<Alimento>(this.base_path + '/' + id, this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}