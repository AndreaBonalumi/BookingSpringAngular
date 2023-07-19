import {
  AfterContentChecked,
  Component,
  EventEmitter,
  Input, OnChanges, OnInit,
  Output, SimpleChanges
} from '@angular/core';
import {MyTableConfig} from "../../interfaces/my-table-config";
import {ConfigButton} from "../../interfaces/config-button";
@Component({
  selector: 'app-tool-pagination',
  templateUrl: './tool-pagination.component.html',
  styleUrls: ['./tool-pagination.component.css']
})
export class ToolPaginationComponent implements AfterContentChecked, OnChanges, OnInit{
  @Input() table !: MyTableConfig;
  @Input() start !: number;
  @Input() totalItems !: number;
  @Output() emit : EventEmitter<number> = new EventEmitter<number>()

  isManipolationData !: number
  end !: number;
  pagination !: number;
  paginaCorrente !: number;
  arrayPagine : number[] = [];
  button_next: ConfigButton = {
    text: 'Next',
    icon: 'map',
    class: 'primary'
  }
  button_back: ConfigButton = {
    text: 'Back',
    icon: 'map',
    class: 'primary'
  }

  setUp() {
    if (this.start >= this.totalItems) {
      this.start -= this.table.pagination.itemPerPage
      this.setUp()
    }
    if (this.start < 0) {
      this.start = 0
    }
    this.end = this.start + this.table.pagination.itemPerPage;
    this.pagination = Math.ceil(this.totalItems / this.table.pagination.itemPerPage)
    this.paginaCorrente = Math.floor(this.start / this.table.pagination.itemPerPage) + 1;
    this.arrayPagine = this.range(this.pagination);
  }
  next(): void {
    this.start += this.table.pagination.itemPerPage
    this.end += this.table.pagination.itemPerPage
    this.paginaCorrente ++
    this.emit.emit(this.paginaCorrente)
  }
  back(): void {
    if(this.start >= this.table.pagination.itemPerPage)
      this.start -= this.table.pagination.itemPerPage
    else
      this.start = 0
    this.end -= this.table.pagination.itemPerPage
    this.paginaCorrente--
    this.emit.emit(this.paginaCorrente)
  }
  range(numero: number): number[] {
    let arrayNum : number[] = []
    for (let i = 1; i <= numero; i++)
      arrayNum.push(i)
    return arrayNum
  }
  changePagination(n: number): void {
    this.start = this.table.pagination.itemPerPage * (n - 1)
    this.end = this.start + this.table.pagination.itemPerPage
    this.paginaCorrente = n
    this.emit.emit(this.paginaCorrente)
  }
  ngAfterContentChecked(): void {
    if (this.end - this.start != parseInt(String(this.table.pagination.itemPerPage))) {
      this.table.pagination.itemPerPage = parseInt(String(this.table.pagination.itemPerPage))
      this.setUp()
      this.emit.emit(this.paginaCorrente)
    }
    if(!this.pagination) {
      this.setUp()
    }
  }

  ngOnChanges(changes:SimpleChanges): void {
    this.setUp()
  }

  ngOnInit(): void {
    this.isManipolationData = this.start
    this.setUp()
  }
}
