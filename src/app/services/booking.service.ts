import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Booking} from "../interfaces/booking";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrl = "http://localhost:8091/api/booking"
  constructor(private http: HttpClient) { }
  getBookingById(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url)
  }
  getBookings(): Observable<any> {
    const url = `${this.apiUrl}/all`;
    return this.http.get(url)
  }
  insertBooking(booking: Booking): Observable<any> {
    const url = `${this.apiUrl}/insert`
    return this.http.post(url, booking)
  }
  editBooking(booking: Booking): Observable<any> {
    const url = `${this.apiUrl}/edit`
    return this.http.put(url, booking)
  }
  deleteBooking(id: string): Observable<any> {
    const url = `${this.apiUrl}/delete/${id}`
    return this.http.delete(url)
  }
}
