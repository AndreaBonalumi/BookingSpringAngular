import {Component, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {ActivatedRoute, Router} from "@angular/router";
import {Car} from "../../interfaces/car";
import {Booking} from "../../interfaces/booking";
import {MyHeaders} from "../../interfaces/my-headers";
import {bookingHeaders, TABLEADMIN, userHeaders} from "../../mock-dati";
import {MyTableActionEnum} from "../../interfaces/my-table-action-enum";
import {TableEvent} from "../../components/my-table/my-table.component";
import {UserService} from "../../services/user.service";
import {BookingService} from "../../services/booking.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userLogger !: User;
  id: number = 1;
  users ?: User[];
  bookings ?: Booking[];
  headers !: MyHeaders[];
  cars: Car[] = [];
  tableConfig = TABLEADMIN;
  constructor(private router: Router, private activeRoute: ActivatedRoute,
              private datiService: UserService, private bookingService: BookingService) {}
  ngOnInit() {
    this.datiService.getUserById(this.id).subscribe(user => {
      this.userLogger = user
      if (this.userLogger.admin) {
        this.fetchUsers()
        this.headers = userHeaders;
      } else {
        this.fetchBooking()
        this.headers = bookingHeaders;
      }
    })
  }
  goUserBooking(id: string) {
    this.router.navigate(['bookings/' + id])
  }
  action(tableEvent: TableEvent) {

    let route: string
    if (this.userLogger.admin) {
      route = 'manageUser'
    }
    else {
      route = this.id + '/manageBooking'
    }

    if (tableEvent.action === MyTableActionEnum.NEW_ROW) {
      this.router.navigate([`${route}`])
    }
    if (tableEvent.action === MyTableActionEnum.EDIT) {
      this.router.navigate([`${route}/${tableEvent.value}`])
    }
    if (tableEvent.action === MyTableActionEnum.DELETE) {
      if (this.userLogger.admin) {
        this.datiService.deleteUser(tableEvent.value).subscribe(() => {
          this.fetchUsers()
        })
      } else {
        this.bookingService.deleteBooking(tableEvent.value).subscribe(() => {
          this.fetchBooking()
        })
      }
    }
  }
  fetchBooking() {
    this.datiService.getUserBookings(this.id).subscribe(bookings => this.bookings = bookings)
  }
  fetchUsers() {
    this.datiService.getUsers().subscribe(users => this.users = users)
  }
}
