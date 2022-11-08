import { Dieta } from './../app/models/dieta';
//api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiDietasService {

  // API path
  base_path = 'http://localhost:8000/api/dietas';



  constructor(private http: HttpClient) { }

  public auth_token = localStorage.getItem('data_token');
  
  // Http Options
  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.auth_token}`
      })
    } 
  }

  handleError(error: HttpErrorResponse) {  
    return throwError({"status":error.status , "msg": error.error });
  };

  // Create a new item
  createItem(item): Observable<Dieta> {
    
    return this.http      
      .post<Dieta>(this.base_path, JSON.stringify(item), this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get single dieta data by ID
  getItem(id): Observable<Dieta> {
    return this.http
      .get<Dieta>(this.base_path + '/listar/' + id, this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get dietas data
  getList(): Observable<Dieta> {
 
    debugger
    return this.http
      .get<Dieta>(this.base_path+'/listar', this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )

  }

    // Get dietas data
    getListByUserId(id): Observable<Dieta> {
 
      debugger
      return this.http
        .get<Dieta>(this.base_path+'/listar/user/'+id, this.getHttpOptions())
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
  
    }

  // Update item by id
  updateItem(id, item): Observable<Dieta> {
    return this.http
      .post<Dieta>(this.base_path + '/' + id, JSON.stringify(item), this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Delete item by id
  deleteItem(id) {
    return this.http
      .delete<Dieta>(this.base_path + '/' + id, this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}