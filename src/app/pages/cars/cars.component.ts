import { Component } from '@angular/core';
import {carHeaders} from "../../mock-dati";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent {

  cars = [];
  headers = carHeaders;
}
