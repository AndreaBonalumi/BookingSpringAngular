import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces/user";
import {Auth} from "../interfaces/auth";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "http://localhost:8091/api/user"
  constructor(private http: HttpClient) { }

  getUserById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url)
  }
  getUsers(): Observable<any> {
    const url = `${this.apiUrl}/all`;
    return this.http.get(url)
  }
  getUserBookings(id: number): Observable<any> {
    const url = `${this.apiUrl}/detail/${id}`
    return this.http.get(url)
  }
  insertUser(user: User): Observable<any> {
    const url = `${this.apiUrl}/insert`
    return this.http.post(url, user)
  }
  deleteUser(id: number): Observable<any> {
    const url = `${this.apiUrl}/delete/${id}`
    return this.http.delete(url)
  }
  authenticate(auth: Auth): Observable<any> {
    const url = `${this.apiUrl}/authenticate`
    return this.http.post(url, auth)
  }
}
