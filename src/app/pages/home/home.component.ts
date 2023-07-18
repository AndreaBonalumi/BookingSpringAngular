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
  users ?: User[];
  username !: string | null
  bookings ?: Booking[];
  headers !: MyHeaders[];
  cars: Car[] = [];
  tableConfig = TABLEADMIN;
  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private userService: UserService,
              private bookingService: BookingService) {}
  ngOnInit() {

    if (sessionStorage.getItem("username") != null) {
      this.username = sessionStorage.getItem("username")

      this.userService.getByUsername(this.username!).subscribe({
        next: user => {
          this.userLogger = user
          if (this.userLogger.admin) {
            this.fetchUsers()
            this.headers = userHeaders;
          } else {
            this.fetchBooking()
            this.headers = bookingHeaders;
          }
        },
        error: err => {
          console.log(err)
          sessionStorage.clear()
        }
      })
    }
  }

  goUserBooking(row: any) {
    this.router.navigate(['bookings/' + row.idUser])
  }
  action(tableEvent: TableEvent) {
    let route: string
    if (this.userLogger.admin) {
      route = 'manageUser'
    }
    else {
      route = this.userLogger.idUser + '/manageBooking'
    }

    if (tableEvent.action === MyTableActionEnum.NEW_ROW) {
      this.router.navigate([`${route}`])
    }
    if (tableEvent.action === MyTableActionEnum.EDIT) {
      if (this.userLogger.admin){
        this.router.navigate([`${route}/${tableEvent.value.idUser}`])
      } else {
        this.router.navigate([`${route}/${tableEvent.value.idBooking}`])
      }
    }
    if (tableEvent.action === MyTableActionEnum.DELETE) {
      if (this.userLogger.admin) {
        this.userService.deleteUser(tableEvent.value.idUser).subscribe(() => this.fetchUsers())
      } else {
        this.bookingService.deleteBooking(tableEvent.value.idBooking).subscribe(() => this.fetchBooking())
      }
    }
  }
  fetchBooking() {
    this.userService.getUserBookings(this.userLogger.idUser!).subscribe(bookings => this.bookings = bookings)
  }
  fetchUsers() {
    this.userService.getUsers().subscribe(users => this.users = users)
  }
}
