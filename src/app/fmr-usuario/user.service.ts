import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../shared/user';
import { Response } from './../shared/response'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = `${environment.server.host}:${environment.server.port}${environment.api.user}/`;

  constructor(private http: HttpClient) { }
 

  post(user: User,token: string): Observable<Response<User>> {
    const url = `${environment.server.host}:${environment.server.port}${environment.context}${environment.api.register}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Response<User>>(url, user,httpOptions);

  }

  get(token: string): Observable<Response<User>> {
    const url = `${environment.server.host}:${environment.server.port}${environment.context}${environment.api.user}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+token
      })
    };
    return this.http.get<Response<User>>(url, httpOptions);

  }

  put(user: User,id:string,token: string): Observable<Response<User>> {
    const url = `${environment.server.host}:${environment.server.port}${environment.context}${environment.api.user}/${id}`;
    console.log(token)
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+token
      })
    };
    return this.http.put<Response<User>>(url, user,httpOptions);

  }

}
