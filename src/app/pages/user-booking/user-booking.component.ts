import {Component, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {bookingHeaders, TABLEBOOKING} from "../../mock-dati";
import {ActivatedRoute} from "@angular/router";
import {Booking} from "../../interfaces/booking";
import {TableEvent} from "../../components/my-table/my-table.component";
import {UserService} from "../../services/user.service";
import {BookingService} from "../../services/booking.service";

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

  constructor(private userService: UserService, private activeRoute: ActivatedRoute, private bookingService: BookingService) {
  }
  ngOnInit() {
    let id = this.activeRoute.snapshot.paramMap.get("id")
    this.userService.getUserById(Number(id!)).subscribe(user => this.user = user)
    this.userService.getUserBookings(Number(id!)).subscribe(bookings => this.bookings = bookings)
  }
  action(tableEvent: TableEvent) {
    this.bookingService.getBookingById(tableEvent.value).subscribe( booking => {
      this.bookingService.manageBooking(booking, tableEvent.action).subscribe(() => {
        const index = this.bookings.findIndex(item => item === tableEvent.value)
        if (index !== -1) {
          this.bookings.splice(index, 1)
        }
      })
    })
  }
}
