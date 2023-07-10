import {Component, OnInit} from '@angular/core';
import {carHeaders} from "../../mock-dati";
import {Car} from "../../interfaces/car";
import {MyTableActionEnum} from "../../interfaces/my-table-action-enum";
import {Router} from "@angular/router";
import {TableEvent} from "../../components/my-table/my-table.component";
import {CarService} from "../../services/car.service";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit{

  cars: Car[] = [];
  headers = carHeaders;

  constructor(private router: Router, private carService: CarService) {
  }
  ngOnInit() {
    this.fetchCars()
  }
  action(tableEvent: TableEvent) {
    if (tableEvent.action === MyTableActionEnum.NEW_ROW) {
      this.router.navigate(['manageCar'])
    }
    if (tableEvent.action === MyTableActionEnum.EDIT) {
      this.router.navigate([`manageCar/${tableEvent.value.idCar}`])
    }
    if (tableEvent.action === MyTableActionEnum.DELETE) {
      this.carService.deleteCar(tableEvent.value.idCar)
        .subscribe( () => {
          this.fetchCars()
        })
    }
  }
  fetchCars() {
    this.carService.getCars().subscribe(cars => this.cars = cars)
  }
}
