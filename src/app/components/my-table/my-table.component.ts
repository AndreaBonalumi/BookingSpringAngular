import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter, Input,
  OnInit,
  Output,
} from '@angular/core';
import {MyHeaders} from "../../interfaces/my-headers";
import {MyTableActionEnum} from "../../interfaces/my-table-action-enum";
import {TABLE} from "../../configurations/table";

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit, AfterContentChecked {
  @Output() emitButton: EventEmitter<any> = new EventEmitter<any>()
  @Output() emitRow: EventEmitter<any> = new EventEmitter<any>()
  @Input() data !: any[];
  @Input() headers !: MyHeaders[];
  @Input() tableConfig = TABLE;

  iconaOrdinamento !: string;
  searchText: string = '';
  searchColumn: string = '';
  start : number = 0;
  end !: number;
  getValue = (obj: any, key: string) => {
    const keys = key.split(".");
    let value = obj;
    for (let i = 0; i < keys.length; i++) {
      value = value[keys[i]];
      if (!value) {
        break;
      }
    }
    return value;
  };
  constructor(private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    this.tableConfig.headers = this.headers;
    this.tableConfig.search.columns = this.headers;
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
    if (this.end - this.start == this.tableConfig.pagination.itemPerPage) {
      this.start = (currentPage - 1) * this.tableConfig.pagination.itemPerPage
    }
    this.end = this.start + this.tableConfig.pagination.itemPerPage
  }
  emitOnlyButton(e: Event, tableEvent: TableEvent) {
    e.stopPropagation()
    this.emitButton.emit(tableEvent)
  }
  ngAfterContentChecked(): void {
    this.cdr.detectChanges()
  }
}

export interface TableEvent {
  action: MyTableActionEnum,
  value ?: any
}
