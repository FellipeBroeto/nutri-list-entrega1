import { Response } from './../app/models/response';
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
  base_path_oper = 'http://localhost:8000/api';


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
  createItem(item: Dieta): Observable<Dieta> {
    
    return this.http      
      .post<Dieta>(this.base_path, JSON.stringify(item), this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get single dieta data by ID
  getItem(id: string | number): Observable<Dieta> {
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
    getListByUserId(id: string): Observable<Dieta> {
 
      debugger
      return this.http
        .get<Dieta>(this.base_path+'/listar/user/'+id, this.getHttpOptions())
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
  
    }

  // Update item by id
  updateItem(id: string | number, item: Dieta): Observable<Dieta> {
    return this.http
      .post<Dieta>(this.base_path + '/' + id, JSON.stringify(item), this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Delete item by id
  deleteItem(id: string) {
    return this.http
      .delete<Dieta>(this.base_path + '/' + id, this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // associar dieta usuario
  associarDietaUsuarioOld(id_usuario: string | number, id_dieta: string | number): Observable<Response> {
  
    debugger
    return this.http
      .post<Response>(this.base_path_oper +'/associar-dieta-usuario/'+id_dieta+'/'+id_usuario, this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )

  }

  associarDietaUsuario(id_usuario: string | number, id_dieta: string | number): Observable<Response> {
    let item = {};
    debugger
    return this.http
      .post<Response>(this.base_path_oper +'/associar-dieta-usuario/'+id_dieta+'/'+id_usuario, 
                      null, 
                      this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  // desassociar dieta usuario
  desassociarDietaUsuario(id_dieta: string, id_usuario: string): Observable<Response> {
  
    debugger
    return this.http
      .post<Response>(this.base_path_oper +'/desassociar-dieta-usuario/'+id_dieta+'/'+id_usuario, 
      null,
      this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )

  }

  // associar alimento dieta
  associarAlientoDieta(id_alimento: string, id_dieta: string): Observable<Response> {
  
    debugger
    return this.http
      .post<Response>(this.base_path_oper +'/associar-alimento-dieta/'+id_alimento+'/'+id_dieta, null, this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )

  }

  // desassociar alimento dieta
  desassociarAlientoDieta(id_alimento: string, id_dieta: string): Observable<Response> {
  
    debugger
    return this.http
      .post<Response>(this.base_path_oper +'/desassociar-alimento-dieta/'+id_alimento+'/'+id_dieta, null, this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      )

  }
}