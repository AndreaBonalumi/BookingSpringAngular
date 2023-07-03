import {Component, OnInit} from '@angular/core';
import {carHeaders} from "../../mock-dati";
import {ActivatedRoute, Router} from "@angular/router";
import {DatiService} from "../../services/dati.service";
import {Car} from "../../interfaces/car";
import * as moment from "moment";
@Component({
  selector: 'app-manage-car',
  templateUrl: './manage-car.component.html',
  styleUrls: ['./manage-car.component.css']
})
export class ManageCarComponent implements OnInit{

  carFields = carHeaders;
  car !: Car
  constructor(private router: Router, private datiService: DatiService, private activeRoute: ActivatedRoute) {
  }
  ngOnInit() {
    let id = this.activeRoute.snapshot.paramMap.get("id")
    if (id == null) {
      this.car = {
        brand: '',
        color: '',
        description: '',
        id: '',
        link: '',
        model: '',
        year: 0
      }
    } else {
      this.datiService.getCarById(id!).subscribe(car => {
        this.car = car
      })
    }
  }
  manageCar(car: Car) {
     if (car.id) {
         this.datiService.editCar(this.car).subscribe(() => this.router.navigate(['cars']))
       } else {
         this.car.created = moment()
         this.datiService.insertCar(this.car).subscribe(() => this.router.navigate(['cars']))
       }
     }
}
