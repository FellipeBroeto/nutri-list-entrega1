
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Nutricionista } from 'src/app/models/nutricionista';    
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiNutricionistaService {

  // API path
  base_path = 'http://localhost:8000/api/nutricionistas';



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
  
  createItem(item): Observable<Nutricionista> {
 
    return this.http      
      .post<Nutricionista>(this.base_path, JSON.stringify(item), this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  
  getItem(id): Observable<Nutricionista> {
       
    return this.http
      .get<Nutricionista>(this.base_path + '/listar/' + id, this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  
  getList(): Observable<Nutricionista> {
  
    
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.auth_token}`
      })
      
     
    return this.http
      .get<Nutricionista>(this.base_path+"/listar", this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )

  }

  // Update item by id
  updateItem(id, item): Observable<Nutricionista> {

       

    return this.http
      .post<Nutricionista>(this.base_path + '/' + id, JSON.stringify(item), this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Delete item by id
  deleteItem(id) {
       
    return this.http
      .delete<Nutricionista>(this.base_path + '/' + id, this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}