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
    let idUser: number = Number(this.activeRoute.snapshot.paramMap.get("id"))
    this.userService.getUserById(idUser).subscribe({
      next: user => {
        this.user = user
        this.userService.getUserBookings(user.idUser).subscribe(bookings => this.bookings = bookings)
      },
      error: err => {
        console.log(err)
        localStorage.clear()
      }
    })

  }
  action(tableEvent: TableEvent) {
    this.bookingService.getBookingById(tableEvent.value.idBooking).subscribe({
      next: booking => {
        this.bookingService.manageBooking(booking, tableEvent.action).subscribe(() => {
          const index = this.bookings.findIndex(item => item.idBooking === tableEvent.value.idBooking)
          if (index !== -1) {
            this.bookings[index].status = tableEvent.action
          }
        })
      }
    })
  }
}
