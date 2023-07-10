import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Car} from "../interfaces/car";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = "http://localhost:8091/api/car"
  constructor(private http: HttpClient) { }

  getCarById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url)
  }
  getCars(): Observable<any> {
    const url = `${this.apiUrl}/all`;
    return this.http.get(url)
  }
  insertCar(car: Car): Observable<any> {
    const url = `${this.apiUrl}/insert`
    return this.http.post(url, car)
  }
  deleteCar(id: number): Observable<any> {
    const url = `${this.apiUrl}/delete/${id}`
    return this.http.delete(url)
  }
}
