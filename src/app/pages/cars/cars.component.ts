import {Component, OnInit} from '@angular/core';
import {carHeaders} from "../../mock-dati";
import {Car} from "../../interfaces/car";
import {DatiService} from "../../services/dati.service";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit{

  cars: Car[] = [];
  headers = carHeaders;

  constructor(private datiService: DatiService) {
  }
  ngOnInit() {
    this.datiService.getCars().subscribe(cars => this.cars = cars)
  }
}
