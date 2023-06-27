import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {MyTableConfig} from "../interfaces/my-table-config";
import {TABLE} from "../mock-dati";

@Injectable({
  providedIn: 'root'
})
export class DatiService {
    private apiUrl = 'http://localhost:3000/data'
    constructor(private http: HttpClient) {}
    getData(): Observable<any> {
      return this.http.get(this.apiUrl);
    }
    getDato(id: string): Observable<any> {
      const url = `${this.apiUrl}/${id}`
      return this.http.get(url)
    }
    static getTable(): MyTableConfig {
      return TABLE;
    }
    newData(d: any): Observable<any> {
      return this.http.post(this.apiUrl, d);
    }
    editData(id: number, d: any): Observable<any> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.put(url, d);
    }
    deleteData(d: any): Observable<any> {
      const url = `${this.apiUrl}/${d.id}`;
      return this.http.delete(url);
    }
    changeRole(d: any): Observable<any> {
      if (d['role'] == 'admin')
        d['role'] = 'customer'
      else
        d['role'] = 'admin'
      return  this.editData(d.id, d)
    }
    filter(colonna: string, searchText: string): Observable<any> {
      let params = new HttpParams();
      params = params.set(`${colonna}_like`, searchText)
      return this.http.get(this.apiUrl, {params})
    }
    orderAndPagination(colonna: string, verso: string, currentPage: number, itemPerPage: number): Observable<any> {
      let params = new HttpParams();
      params = params.set(`_page`, currentPage)
        .set(`_limit`, itemPerPage)
        .set(`_sort`, colonna)
        .set(`_order`, verso);
      return this.http.get(this.apiUrl, {params})
    }
}
