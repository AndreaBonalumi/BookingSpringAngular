import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {bookingHeaders, TABLEBOOKING} from "../../mock-dati";
import {DatiService} from "../../services/dati.service";
import {ActivatedRoute} from "@angular/router";
import {Booking} from "../../interfaces/booking";
import {MyTableActionEnum} from "../../interfaces/my-table-action-enum";

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
    this.datiService.getUserById(id!).subscribe(user => this.user = user)
    this.datiService.getUserBookings(id!).subscribe(bookings => this.bookings = bookings)
  }
  action(action: any[]) {
    this.datiService.getBookingById(action[1]).subscribe( booking => {
      if (action[0] === MyTableActionEnum.APPROVE) {
        booking.status = 1
      }
      if (action[0] === MyTableActionEnum.DECLINE) {
        booking.status = 2
      }
      this.datiService.editBooking(booking).subscribe(() => {
        const index = this.bookings.findIndex(item => item.id === action[1])
        if (index !== -1) {
          this.bookings.splice(index, 1)
        }
      })
    })
  }
}
