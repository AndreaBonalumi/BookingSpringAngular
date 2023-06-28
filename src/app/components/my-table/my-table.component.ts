import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter, Input, IterableDiffer, IterableDiffers,
  OnInit,
  Output,
} from '@angular/core';
import {MyTableConfig} from "../../interfaces/my-table-config";
import {MyHeaders} from "../../interfaces/my-headers";
import { DatiService } from "../../services/dati.service";

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit, AfterContentChecked {
  @Output() emit: EventEmitter<any> = new EventEmitter<any>()
  @Input() data !: any[];
  @Input() headers !: MyHeaders[];
  tableConfig : MyTableConfig = DatiService.getTable();
  iconaOrdinamento !: string;
  searchText: string = '';
  searchColumn: string = '';
  start : number = 0;
  end !: number;
  totalItems : number = 0;
  currentPage !: number;
  constructor(private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    this.currentPage = 1
    this.tableConfig.headers = this.headers;
    this.tableConfig.search.columns = this.headers;
    this.totalItems = this.data.length;
    this.end = this.start + this.tableConfig.pagination.itemPerPage
    if (this.tableConfig.order.verso == 'asc') {
      this.iconaOrdinamento = '↓'
    } else {
      this.iconaOrdinamento = '↑'
    }
  }
  ordinamento(key: string): void {
    if (this.tableConfig.order.colonna === key) {
      if (this.tableConfig.order.verso === 'asc') {
        this.tableConfig.order.verso = 'desc'
        this.iconaOrdinamento = '↑'
      } else {
        this.tableConfig.order.verso = 'asc'
        this.iconaOrdinamento = '↓'
      }

    } else {
      this.tableConfig.order.colonna = key;
      this.tableConfig.order.verso = 'asc';
      this.iconaOrdinamento = '↓';
    }
  }
  changePagination(currentPage: number): void {
    this.currentPage = currentPage
    this.end = this.start + this.tableConfig.pagination.itemPerPage
  }
  ngAfterContentChecked(): void {
    this.cdr.detectChanges()
  }
  emitter(azione: string, dato ?: MyHeaders): void {
    const e = {key: azione, dato: dato}
    this.emit.emit(e)
  }
}
