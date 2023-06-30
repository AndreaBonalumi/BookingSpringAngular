import {Component, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {bookingHeaders, TABLEBOOKING} from "../../mock-dati";
import {DatiService} from "../../services/dati.service";
import {ActivatedRoute} from "@angular/router";
import {Booking} from "../../interfaces/booking";
import {MyTableActionEnum} from "../../interfaces/my-table-action-enum";
import {TableEvent} from "../../components/my-table/my-table.component";

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
    let id = this.activeRoute.snapshot.paramMap.get("id")
    this.datiService.getUserById(id!).subscribe(user => this.user = user)
    this.datiService.getUserBookings(id!).subscribe(bookings => this.bookings = bookings)
  }
  action(tableEvent: TableEvent) {
    this.datiService.getBookingById(tableEvent.value).subscribe( booking => {
      if (tableEvent.action === MyTableActionEnum.APPROVE) {
        booking.status = 1
      }
      if (tableEvent.action === MyTableActionEnum.DECLINE) {
        booking.status = 2
      }
      this.datiService.editBooking(booking).subscribe(() => {
        const index = this.bookings.findIndex(item => item.id === tableEvent.value)
        if (index !== -1) {
          this.bookings.splice(index, 1)
        }
      })
    })
  }
}
