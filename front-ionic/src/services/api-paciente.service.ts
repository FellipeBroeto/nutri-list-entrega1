//api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Paciente } from 'src/app/models/paciente';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiPacienteService {

  // API path
  base_path = 'http://localhost:8000/api/pacientes'; 

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
  createItem(item): Observable<Paciente> {
    
    let httpOptions =  this.getHttpOptions();
     

    debugger;

    return this.http      
      .post<Paciente>(this.base_path, JSON.stringify(item), this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get single paciente data by ID
  getItem(id): Observable<Paciente> {
    return this.http
      .get<Paciente>(this.base_path + '/listar/' + id, this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get paciente data
  getList(): Observable<Paciente> {
  
      
    return this.http
      .get<Paciente>(this.base_path+'/listar', this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )

  }

  // Update item by id
  updateItem(id, item): Observable<Paciente> {
    return this.http
      .post<Paciente>(this.base_path + '/' + id, JSON.stringify(item), this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Delete item by id
  deleteItem(id) {
    return this.http
      .delete<Paciente>(this.base_path + '/' + id, this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}