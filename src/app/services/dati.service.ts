import { Injectable } from '@angular/core';
import {MyTableConfig} from "../interfaces/my-table-config";
import {TABLE} from "../mock-dati";

@Injectable({
  providedIn: 'root'
})
export class DatiService {
    static getTable(): MyTableConfig {
      return TABLE;
    }
}
