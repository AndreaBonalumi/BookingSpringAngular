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
  @Input() data: any[] | undefined;
  tableConfig : MyTableConfig = DatiService.getTable();
  iconaOrdinamento !: string;
  searchText: string = '';
  searchColumn: string = '';
  start : number = 0;
  end !: number;
  totalItems : number = 0;
  currentPage !: number;
  parzialData !: any[];
  iterableDiffer !: IterableDiffer<any>;
  constructor(private cdr: ChangeDetectorRef,
              private datiService: DatiService,
              private iterableDiffers: IterableDiffers) {
    this.iterableDiffer = this.iterableDiffers.find([]).create()
  }
  ngOnInit() {
    this.currentPage = 1
    this.datiService.getData().subscribe((data: any[]) => this.data = data)
    this.end = this.start + this.tableConfig.pagination.itemPerPage
    if (this.tableConfig.order.verso == 'asc') {
      this.iconaOrdinamento = '↓'
    } else {
      this.iconaOrdinamento = '↑'
    }
    this.datiService.orderAndPagination(this.tableConfig.order.colonna,
      this.tableConfig.order.verso,
      this.currentPage,
      this.tableConfig.pagination.itemPerPage
    ).subscribe((data: any[]) => this.parzialData = data)
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
    this.datiService.orderAndPagination(
      this.tableConfig.order.colonna,
      this.tableConfig.order.verso,
      this.currentPage,
      this.tableConfig.pagination.itemPerPage
    ).subscribe(data => this.parzialData = data)
  }
  changePagination(currentPage: number): void {
    this.currentPage = currentPage
    this.end = this.start + this.tableConfig.pagination.itemPerPage
    this.datiService.orderAndPagination(this.tableConfig.order.colonna,
      this.tableConfig.order.verso,
      this.currentPage,
      this.tableConfig.pagination.itemPerPage
    ).subscribe((data: any[]) => this.parzialData = data)
  }
  ngAfterContentChecked(): void {
    this.cdr.detectChanges()
    const changes = this.iterableDiffer.diff(this.data);
    if (changes) {
      changes.forEachAddedItem(() => this.totalItems++)
      changes.forEachRemovedItem(() => this.totalItems--)
      this.datiService.orderAndPagination(this.tableConfig.order.colonna,
        this.tableConfig.order.verso,
        this.currentPage,
        this.tableConfig.pagination.itemPerPage
      ).subscribe((data: any[]) => this.parzialData = data)
    }
  }
  emitter(azione: string, dato ?: MyHeaders): void {
    const e = {key: azione, dato: dato}
    this.emit.emit(e)
  }
  filtra() {
    this.datiService.filter(this.searchColumn, this.searchText).subscribe((data: any[]) => this.data = data)
  }
}
