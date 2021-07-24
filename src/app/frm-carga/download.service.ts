import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ByteFile } from "../shared/bite.file";
import { Response } from '../shared/response';

@Injectable({
  providedIn: 'root'
})

  export class DownloadService {

    constructor(private http: HttpClient) { }
    
    post(token: string){
      const url = `${environment.server.host}:${environment.server.port}${environment.context}${environment.api.download}`;
      const httpOptions = {
        headers: new HttpHeaders({ 
          'Authorization': 'Bearer '+token
        })
      };
      return this.http.post<Response<ByteFile>>(url,"",httpOptions);
    } 

    
  }