import {Component, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {Car} from "../../interfaces/car";
import {Booking} from "../../interfaces/booking";
import {DatiService} from "../../services/dati.service";
import {ActivatedRoute, Router} from "@angular/router";
import {carHeaders, TABLECAR} from "../../mock-dati";
import * as dayjs from 'dayjs'


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

  constructor(private datiService: DatiService, private router: Router, private activeroute: ActivatedRoute) {}
  ngOnInit() {
    let idBooking = this.activeroute.snapshot.paramMap.get("idBooking")
    if(idBooking != null) {
      this.datiService.getBookingById(idBooking!).subscribe(booking => this.booking = booking)
    } else {
      let idUser = this.activeroute.snapshot.paramMap.get("idUser")
      this.datiService.getUserById(idUser!).subscribe(user => {
        this.booking = {
          dateBookingEnd: undefined,
          dateBookingStart: undefined,
          id: "",
          status:  0,
          userId: user.id

        }
      })
    }
  }
  searchCars() {
    this.datiService.getCars().subscribe(cars => {
      this.cars = cars
    })
  }
  saveBooking(id: string) {
    this.booking.carId = id
    this.booking.status = 0;
    this.datiService.getCarById(id).subscribe(car => {
      this.booking.car = car
      if (this.booking.id)
        this.datiService.editBooking(this.booking).subscribe(() => this.router.navigate(['home']))
      else
        this.datiService.insertBooking(this.booking).subscribe(() => this.router.navigate(['home']))
    })
  }
}
