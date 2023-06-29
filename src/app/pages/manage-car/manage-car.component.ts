import { Component } from '@angular/core';
import {carHeaders} from "../../mock-dati";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {DatiService} from "../../services/dati.service";
import {Car} from "../../interfaces/car";

@Component({
  selector: 'app-manage-car',
  templateUrl: './manage-car.component.html',
  styleUrls: ['./manage-car.component.css']
})
export class ManageCarComponent {

  carFields = carHeaders;
  car !: Car
  constructor(private router: Router, private datiService: DatiService) {
  }

  manageCar(form: NgForm) {
     this.datiService.getCarById(form.value.id).subscribe(car => {
       this.car.brand = form.value.brand
       this.car.model = form.value.model
       this.car.color = form.value.color
       this.car.description = form.value.description
       this.car.link = form.value.link
       this.car.year = form.value.year
       this.car.created = 'today'

       if(car != null || car != undefined) {
         this.datiService.editCar(this.car).subscribe(() => this.router.navigate(['cars']))
       } else {
         this.datiService.insertCar(this.car).subscribe(() => this.router.navigate(['cars']))
       }
     })
  }
}
