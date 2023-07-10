import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "http://localhost:8091/api/user"
  constructor(private http: HttpClient) { }

  getUserById(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url)
  }
  getUsers(): Observable<any> {
    const url = `${this.apiUrl}/all`;
    return this.http.get(url)
  }
  getUserBookings(id: string): Observable<any> {
    const url = `${this.apiUrl}/detail/${id}`
    return this.http.get(url)
  }
  insertUser(user: User): Observable<any> {
    const url = `${this.apiUrl}/insert`
    return this.http.post(url, user)
  }
  editUser(user: User): Observable<any> {
    const url = `${this.apiUrl}/edit`
    return this.http.put(url, user)
  }
  deleteUser(id: string): Observable<any> {
    const url = `${this.apiUrl}/delete/${id}`
    return this.http.delete(url)
  }
}
