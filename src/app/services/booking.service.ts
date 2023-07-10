import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Booking} from "../interfaces/booking";
import {MyTableActionEnum} from "../interfaces/my-table-action-enum";
import {Moment} from "moment";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrl = "http://localhost:8091/api/booking"
  constructor(private http: HttpClient) { }
  getBookingById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url)
  }
  getBookings(): Observable<any> {
    const url = `${this.apiUrl}/all`;
    return this.http.get(url)
  }
  getCarsByDate(start: Moment, end: Moment): Observable<any> {
    const url = `${this.apiUrl}/byDate?start=${start}&end=${end}`
    return this.http.get(url)
  }
  insertBooking(booking: Booking): Observable<any> {
    const url = `${this.apiUrl}/insert`
    return this.http.post(url, booking)
  }
  deleteBooking(id: number): Observable<any> {
    const url = `${this.apiUrl}/delete/${id}`
    return this.http.delete(url)
  }
  manageBooking(booking: Booking, action: MyTableActionEnum): Observable<any> {
    const url = `${this.apiUrl}/manage/${action}`
    return this.http.post(url, booking)
  }
}
