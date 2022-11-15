import { Alimento } from './../app/models/alimento';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
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
  
  // Http Options
  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.auth_token}`
      })
    } 
  }
  

  // Handle API errors
  handleError(error: HttpErrorResponse) {  
    return throwError({"status":error.status , "msg": error.error });
  };


  // Create a new item
  createItem(item): Observable<Alimento> {
    
    return this.http      
      .post<Alimento>(this.base_path, JSON.stringify(item), this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get single alimento data by ID
  getItem(id): Observable<Alimento> {
    return this.http
      .get<Alimento>(this.base_path + '/listar/' + id, this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get alimentos data
  getList(): Observable<Alimento> {
   
    
     return this.http
      .get<Alimento>(this.base_path+'/listar', this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )

  }

  // Get alimentos data by id dieta
  getListByIdDieta(id_dieta): Observable<Alimento> {
    
      
    return this.http
    .get<Alimento>(this.base_path+'/dieta/listar/'+id_dieta, this.getHttpOptions())
    .pipe(
      retry(2),
      catchError(this.handleError)
    )

  }

  // Update item by id
  updateItem(id, item): Observable<Alimento> {
    return this.http
      .post<Alimento>(this.base_path + '/' + id, JSON.stringify(item), this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Delete item by id
  deleteItem(id) {
    return this.http
      .delete<Alimento>(this.base_path + '/' + id, this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}