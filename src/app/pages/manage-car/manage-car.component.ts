import {Component, OnInit} from '@angular/core';
import {carHeaders} from "../../mock-dati";
import {ActivatedRoute, Router} from "@angular/router";
import {Car} from "../../interfaces/car";
import {CarService} from "../../services/car.service";
@Component({
  selector: 'app-manage-car',
  templateUrl: './manage-car.component.html',
  styleUrls: ['./manage-car.component.css']
})
export class ManageCarComponent implements OnInit{

  carFields = carHeaders;
  car !: Car
  constructor(private router: Router, private carService: CarService, private activeRoute: ActivatedRoute) {
  }
  ngOnInit() {
    let id = this.activeRoute.snapshot.paramMap.get("id")
    if (id == null) {
      this.car = {
        plate: '',
        brand: '',
        color: '',
        description: '',
        link: '',
        model: '',
        year: undefined

      }
    } else {
      this.carService.getCarById(Number(id!)).subscribe({
        next: car => this.car = car,
        error: err => sessionStorage.clear()
      })
    }
  }
  manageCar(car: Car) {
    this.carService.insertCar(car).subscribe({
      next: () => this.router.navigate(['cars']),
      error: err => sessionStorage.clear()
    })
  }
}
