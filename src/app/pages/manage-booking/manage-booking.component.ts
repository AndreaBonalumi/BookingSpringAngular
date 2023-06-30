import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {Car} from "../../interfaces/car";
import {Booking} from "../../interfaces/booking";
import {DatiService} from "../../services/dati.service";
import {ActivatedRoute, Router} from "@angular/router";
import {carHeaders, TABLECAR} from "../../mock-dati";
import {Moment} from "moment";

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
  constructor(private datiService: DatiService, private router: Router, private activeroute: ActivatedRoute) {
  }
  ngOnInit() {
    let idBooking = this.activeroute.snapshot.paramMap.get("idBooking")
    if(idBooking !== '-1') {
      this.datiService.getBookingById(idBooking!).subscribe(booking => this.booking = booking)
    } else {
      let idUser = this.activeroute.snapshot.paramMap.get("idUser")
      this.datiService.getUserById(idUser!).subscribe(user => {
        this.booking = new class implements Booking {
          [key: string]: any;
          dateBookingEnd: undefined;
          dateBookingStart: undefined;
          id: string = "";
          status: number = 0;
          userId: string = user.id;
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
    this.datiService.insertBooking(this.booking).subscribe(() => this.router.navigate(['home']))
  }
}
