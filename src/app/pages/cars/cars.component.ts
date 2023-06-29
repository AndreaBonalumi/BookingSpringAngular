import {Component, OnInit} from '@angular/core';
import {carHeaders} from "../../mock-dati";
import {Car} from "../../interfaces/car";
import {DatiService} from "../../services/dati.service";
import {MyTableActionEnum} from "../../interfaces/my-table-action-enum";
import {Router} from "@angular/router";

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
    this.datiService.getCars().subscribe(cars => this.cars = cars)
  }
  action(action: any[]) {
    if (action[0] === MyTableActionEnum.NEW_ROW) {
      this.router.navigate(['manageCar/-1'])
    }
    if (action[0] === MyTableActionEnum.EDIT) {
      this.router.navigate([`manageCar/${action[1]}`])
    }
    if (action[0] === MyTableActionEnum.DELETE) {
      this.datiService.deleteCar(action[1]).subscribe(() => {
        const index = this.cars.findIndex(item => item.id === action[1])
        if (index !== -1) {
          this.cars.splice(index, 1)
        }
      })
    }
  }
}
