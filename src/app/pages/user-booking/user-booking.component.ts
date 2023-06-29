import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {bookingHeaders, TABLEBOOKING} from "../../mock-dati";
import {DatiService} from "../../services/dati.service";
import {ActivatedRoute} from "@angular/router";
import {Booking} from "../../interfaces/booking";

@Component({
  selector: 'app-user-booking',
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.css']
})
export class UserBookingComponent implements OnInit {

  headers = bookingHeaders
  tableConfig = TABLEBOOKING
  user !: User
  bookings !: Booking[]

  constructor(private datiService: DatiService, private activeRoute: ActivatedRoute) {
  }
  ngOnInit() {
    let id = this.activeRoute.snapshot.paramMap.get("idUser")
    this.datiService.getUserBookings(id!).subscribe(bookings => this.bookings = bookings)
  }
}
