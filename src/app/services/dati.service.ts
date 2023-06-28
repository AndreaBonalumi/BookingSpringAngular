import { Injectable } from '@angular/core';
import {MyTableConfig} from "../interfaces/my-table-config";
import {TABLE} from "../mock-dati";
import {HttpClient} from "@angular/common/http";
import {HttpParams } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DatiService {
  private apiUrl = "http://localhost:3000"
  constructor(private http: HttpClient) {}
  login(username: string, password: string): Observable<any> {
     let params = new HttpParams();
     const url = `${this.apiUrl}/users`
     params = params.append("username", username)
     params = params.append("password", password)
     return this.http.get(url, {params: params})
  }
  getUserById(id: number): Observable<any> {
     const url = `${this.apiUrl}/users/${id.toString()}`;
     return this.http.get(url)
  }
   getCarById(id: number): Observable<any> {
     const url = `${this.apiUrl}/cars/${id.toString()}`;
     return this.http.get(url)
   }
   getBookingById(id: number): Observable<any> {
     const url = `${this.apiUrl}/bookings/${id.toString()}`;
     return this.http.get(url)
   }
   getUsers(): Observable<any> {
     const url = `${this.apiUrl}/users`;
     return this.http.get(url)
   }
   getCars(): Observable<any> {
     const url = `${this.apiUrl}/cars`;
     return this.http.get(url)
   }
   getBookings(): Observable<any> {
     const url = `${this.apiUrl}/bookings`;
     return this.http.get(url)
   }
   getUserBookings(id: number) {
     const url = `${this.apiUrl}/users/${id.toString()}/bookings`
   }

}
