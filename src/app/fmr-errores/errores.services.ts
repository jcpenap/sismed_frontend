import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ByteFile } from "../shared/bite.file";
import { Response } from '../shared/response';

@Injectable({
  providedIn: 'root'
})
export class ErroresService {

  constructor(private http: HttpClient) { }
  
  post(token: string){
    const url = `${environment.server.host}:${environment.server.port}${environment.context}${environment.api.fileGet}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+token
      })
    };
    return this.http.get<Response<ByteFile>>(url,httpOptions);
  }

  postErroes(formData,token: string){
    const url = `${environment.server.host}:${environment.server.port}${environment.context}${environment.api.error}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+token
      })
    };
    return this.http.post<Response<ByteFile>>(url, formData, httpOptions);
  }
  
}