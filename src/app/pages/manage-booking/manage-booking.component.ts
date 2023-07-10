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
      let idUser = this.activeroute.snapshot.paramMap.get("idUser")
      this.userService.getUserById(Number(idUser!)).subscribe(user => {
        this.booking = {
          dateBookingEnd: undefined,
          dateBookingStart: undefined,
          userId: user.id
        }
      })
    }
  }
  searchCars() {
    this.bookingService.getCarsByDate(this.booking.dateBookingStart!, this.booking.dateBookingEnd!).subscribe(cars => {
      this.cars = cars
    })
  }
  saveBooking(id: number) {
    this.booking.carId = id
    this.bookingService.insertBooking(this.booking).subscribe(() => this.router.navigate(['home']))
  }
}
