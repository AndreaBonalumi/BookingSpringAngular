import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpParams } from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../interfaces/user";
import {Car} from "../interfaces/car";
import {Booking} from "../interfaces/booking";

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
  getUserById(id: string): Observable<any> {
     const url = `${this.apiUrl}/users/${id}`;
     return this.http.get(url)
  }
   getCarById(id: string): Observable<any> {
     const url = `${this.apiUrl}/cars/${id}`;
     return this.http.get(url)
   }
   getBookingById(id: string): Observable<any> {
     const url = `${this.apiUrl}/bookings/${id}`;
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
   getUserBookings(id: string): Observable<any> {
     const url = `${this.apiUrl}/users/${id}/bookings`
     return this.http.get(url)
   }
   getUserByUsername(username: string): Observable<any> {
     const url = `${this.apiUrl}/users`
     let params = new HttpParams()
     params = params.set('username', username)
     return this.http.get(url, {params})
   }
   insertUser(user: User): Observable<any> {
     const url = `${this.apiUrl}/users`
     return this.http.post(url, user)
   }
   editUser(user: User): Observable<any> {
     const url = `${this.apiUrl}/users/${user.id}`
     return this.http.put(url, user)
   }
   insertCar(car: Car): Observable<any> {
     const url = `${this.apiUrl}/cars`
     return this.http.post(url, car)
   }
   editCar(car: Car): Observable<any> {
     const url = `${this.apiUrl}/cars/${car.id}`
     return this.http.put(url, car)
   }
   insertBooking(booking: Booking): Observable<any> {
     const url = `${this.apiUrl}/bookings`
     return this.http.post(url, booking)
   }
   editBooking(booking: Booking): Observable<any> {
     const url = `${this.apiUrl}/bookings/${booking.id}`
     return this.http.put(url, booking)
   }
   deleteUser(id: string): Observable<any> {
     const url = `${this.apiUrl}/users/${id}`
     return this.http.delete(url)
   }
   deleteCar(id: string): Observable<any> {
     const url = `${this.apiUrl}/cars/${id}`
     return this.http.delete(url)
   }
   deleteBooking(id: string): Observable<any> {
     const url = `${this.apiUrl}/bookings/${id}`
     return this.http.delete(url)
   }

}
