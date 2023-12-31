import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Car} from "../../interfaces/car";
import {CarService} from "../../services/car.service";
import {UserService} from "../../services/user.service";
import {carHeaders} from "../../configurations/headers";
@Component({
  selector: 'app-manage-car',
  templateUrl: './manage-car.component.html',
  styleUrls: ['./manage-car.component.css']
})
export class ManageCarComponent implements OnInit{

  carFields = carHeaders;
  car !: Car
  errors: any[] = []
  constructor(private router: Router, private carService: CarService, private activeRoute: ActivatedRoute, private userService: UserService) {
  }
  ngOnInit() {
    let id = this.activeRoute.snapshot.paramMap.get("id")
    if (id == null) {
      this.userService.getUser().subscribe(user => {
        this.car = {
          plate: '',
          brand: '',
          color: '',
          description: '',
          link: '',
          model: '',
          year: undefined,
          createdBy: user.idUser
        }
      })
    } else {
      this.carService.getCarById(Number(id!)).subscribe({
        next: car => this.car = car,
        error: err => localStorage.clear()
      })
    }
  }
  manageCar(car: Car) {
    this.carService.insertCar(car).subscribe({
      next: () => this.router.navigate(['cars']),
      error: err => {
        for (let fieldName in err.error.errorMap) {
          let errorMessage = err.error.errorMap[fieldName];
          this.errors.push({key: fieldName, label: errorMessage});
        }
      }
    })
  }
}
