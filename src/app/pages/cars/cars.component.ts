import {Component, OnInit} from '@angular/core';
import {carHeaders} from "../../mock-dati";
import {Car} from "../../interfaces/car";
import {DatiService} from "../../services/dati.service";
import {MyTableActionEnum} from "../../interfaces/my-table-action-enum";
import {Router} from "@angular/router";
import {TableEvent} from "../../components/my-table/my-table.component";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit{

  cars: Car[] = [];
  headers = carHeaders;

  constructor(private router: Router, private datiService: DatiService) {
  }
  ngOnInit() {
    this.fetchCars()
  }
  action(tableEvent: TableEvent) {
    if (tableEvent.action === MyTableActionEnum.NEW_ROW) {
      this.router.navigate(['manageCar'])
    }
    if (tableEvent.action === MyTableActionEnum.EDIT) {
      this.router.navigate([`manageCar/${tableEvent.value}`])
    }
    if (tableEvent.action === MyTableActionEnum.DELETE) {
      this.datiService.deleteCar(tableEvent.value)
        .subscribe( () => {
          this.fetchCars()
        })
    }
  }
  fetchCars() {
    this.datiService.getCars().subscribe(cars => this.cars = cars)
  }
}
