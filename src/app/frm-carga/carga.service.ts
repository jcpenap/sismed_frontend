import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ByteFile } from "../shared/bite.file";
import { Response } from '../shared/response';

@Injectable({
  providedIn: 'root'
})
export class CargaService {

  constructor(private http: HttpClient) { }
  
  post(formData,token: string){
    const url = `${environment.server.host}:${environment.server.port}${environment.context}${environment.api.file}`;
    console.log(url)
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+token
      })
    };
    return this.http.post<Response<ByteFile>>(url, formData, httpOptions);
  }
  
}
