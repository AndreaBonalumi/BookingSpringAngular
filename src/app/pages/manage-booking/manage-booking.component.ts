import {Component, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {Car} from "../../interfaces/car";
import {Booking} from "../../interfaces/booking";
import {ActivatedRoute, Router} from "@angular/router";
import {carHeaders, TABLECAR} from "../../mock-dati";
import * as dayjs from 'dayjs'
import {BookingService} from "../../services/booking.service";
import {UserService} from "../../services/user.service";
import {CarService} from "../../services/car.service";

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent implements OnInit{

  user !: User;
  cars !: Car[];
  tableConfig = TABLECAR;
  headers = carHeaders;
  booking !: Booking
  today = dayjs()

  constructor(private bookingService: BookingService,
              private userService: UserService,
              private carService: CarService,
              private router: Router, private activeroute: ActivatedRoute) {}
  ngOnInit() {
    let idBooking = this.activeroute.snapshot.paramMap.get("idBooking")
    if(idBooking != null) {
      this.bookingService.getBookingById(Number(idBooking!)).subscribe(booking => this.booking = booking)
    } else {
      this.userService.getByUsername(localStorage.getItem("username") ? localStorage.getItem("username")! : "")
        .subscribe({
          next: user => {
            this.booking = {
              end: undefined,
              start: undefined,
              user: user
            }
          },
          error: err => {
            console.log(err)
            sessionStorage.clear()
          }
        }
      )
    }
  }
  searchCars() {
    this.bookingService.getCarsByDate(this.booking.start!, this.booking.end!).subscribe(cars => {
      this.cars = cars
    })
  }
  saveBooking(car: Car) {
    this.booking.car = car
    this.bookingService.insertBooking(this.booking).subscribe(() => this.router.navigate(['home']))
  }
}
