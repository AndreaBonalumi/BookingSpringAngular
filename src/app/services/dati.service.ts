import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpParams } from "@angular/common/http";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class DatiService {
  private apiUrl = "http://localhost:8091/api"
  constructor(private http: HttpClient) {}
  login(username: string, password: string): Observable<any> {
     let params = new HttpParams();
     const url = `${this.apiUrl}/users`
     params = params.append("username", username)
     params = params.append("password", password)
     return this.http.get(url, {params: params})
  }

}
