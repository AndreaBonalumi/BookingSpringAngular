import {Component, OnInit} from '@angular/core';
import {carHeaders} from "../../mock-dati";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DatiService} from "../../services/dati.service";
import {Car} from "../../interfaces/car";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";

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
    if (id === '-1') {
      this.car = new class implements Car {
        [key: string]: any;

        brand: string = '';
        color: string = '';
        created: string = '';
        description: string = '';
        id: string = '';
        link: string = '';
        model: string = '';
        year: number = 0;
      }
    } else {
      this.datiService.getCarById(id!).subscribe(car => {
        this.car = car
      })
    }
  }
  manageCar(car: Car) {
     this.datiService.getCarById(car.id).subscribe(car => {

       if(car != null || car != undefined) {
         this.datiService.editCar(this.car).subscribe(() => this.router.navigate(['cars']))
       } else {
         this.car.created = 'today'
         this.datiService.insertCar(this.car).subscribe(() => this.router.navigate(['cars']))
       }
     })
  }
}
