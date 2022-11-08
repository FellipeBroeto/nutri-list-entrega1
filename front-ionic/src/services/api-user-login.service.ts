import { UserLoginCreate } from './../app/models/user-login-create';
import { UserLogin } from './../app/models/user-login';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiUserLoginsService {

  // API path
  base_path = 'http://localhost:8000/api';
 
  constructor(private http: HttpClient) { }

  public auth_token = localStorage.getItem('data_token');


  // Http Options
  getHttpOptions() {
    this.auth_token = localStorage.getItem('data_token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.auth_token}`
      })
    } 
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    /*if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }*/
    // return an observable with a user-facing error message
    //return throwError('Something bad happened; please try again later.');
    return throwError({"status":error.status , "msg": error.error });
  };


  // Create a new item
  createItem(item): Observable<UserLogin> {
    
    return this.http      
      .post<UserLogin>(this.base_path, JSON.stringify(item), this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Create a new item
  login(item): Observable<UserLogin> {
    

    let httpOptions =  {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'          
        })       
    }

    return this.http      
      .post<UserLogin>(this.base_path+"/logar", JSON.stringify(item), httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

   // Create a new item
   logout(): Observable<void> {

    debugger
    
    return this.http      
      .post<void>(this.base_path+"/deslogar", null, this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Create a new item
  register(item): Observable<UserLoginCreate> {
    
    let httpOptions =  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'          
      })       
    }
  
    return this.http      
      .post<UserLoginCreate>(this.base_path+"/registro", JSON.stringify(item), httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get single userlogin data by ID
  getItem(id): Observable<UserLogin> {
    return this.http
      //.get<UserLogin>(this.base_path + '/listar/' + id, this.getHttpOptions())
      .get<UserLogin>(this.base_path + '/usuario-logado', this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


  

  getList(): Observable<UserLogin> { 
       return this.http
      .get<UserLogin>(this.base_path, this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )

  }

  updateItem(id, item): Observable<UserLogin> {
    return this.http
      .put<UserLogin>(this.base_path + '/' + id, JSON.stringify(item), this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Delete item by id
  deleteItem(id) {
    return this.http
      .delete<UserLogin>(this.base_path + '/' + id, this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}