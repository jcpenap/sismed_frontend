import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from './login';
import { Response } from './../shared/response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class  LoginService {

  constructor(private http: HttpClient) { }

  post(username: string, password: string): Observable<Response<Object>> {
    const url = `${environment.server.host}:${environment.server.port}${environment.context}${environment.api.login}`;
    console.log('url: '+url)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    const body = {
      "email": username,
      "password": password
    }

    return this.http.post<Response<Object>>(url, body, httpOptions);
  }
}
