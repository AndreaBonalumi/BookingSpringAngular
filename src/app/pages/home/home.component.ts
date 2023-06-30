import {AfterContentChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {ActivatedRoute, Router} from "@angular/router";
import {DatiService} from "../../services/dati.service";
import {Car} from "../../interfaces/car";
import {Booking} from "../../interfaces/booking";
import {MyHeaders} from "../../interfaces/my-headers";
import {bookingHeaders, TABLEADMIN, TABLEUSER, userHeaders} from "../../mock-dati";
import {MyTableActionEnum} from "../../interfaces/my-table-action-enum";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userLogger !: User;
  id: string = '2';
  users ?: User[];
  bookings ?: Booking[];
  headers !: MyHeaders[];
  cars: Car[] = [];
  tableConfig = TABLEADMIN;
  constructor(private router: Router, private activeRoute: ActivatedRoute, private datiService: DatiService) {}
  ngOnInit() {

    //this.id = this.activeRoute.snapshot.paramMap.get("id")

    this.datiService.getUserById(this.id).subscribe(user => {
      this.userLogger = user
      if (this.userLogger.admin) {
        this.datiService.getUsers().subscribe(users => this.users = users)
        this.headers = userHeaders;
      } else {
        this.datiService.getUserBookings(this.id).subscribe(userBookings => {
          this.bookings = userBookings
          for (let i in this.bookings) {
            // @ts-ignore
            this.datiService.getCarById(this.bookings[i].id.toString()).subscribe(cars => {
              // @ts-ignore
              this.bookings[i].car = cars
            })
          }
        })
        this.headers = bookingHeaders;
      }
    })
  }
  goUserBooking(id: string) {

    this.router.navigate(['bookings/' + id])
  }
  action(action: any[]) {

    let route: string
    if (this.userLogger.admin) {
      route = 'manageUser'
    }
    else {
      route = this.id + '/manageBooking'
    }

    if (action[0] === MyTableActionEnum.NEW_ROW) {
      this.router.navigate([`${route}/-1`])
    }
    if (action[0] === MyTableActionEnum.EDIT) {
      this.router.navigate([`${route}/${action[1]}`])
    }
    if (action[0] === MyTableActionEnum.DELETE) {
      if (this.userLogger.admin) {
        this.datiService.deleteUser(action[1]).subscribe(() => this.users = this.deleteInArray(this.users!, action[1]))
      } else {
        this.datiService.deleteBooking(action[1]).subscribe(() => this.bookings = this.deleteInArray(this.bookings!, action[1]))
      }
    }
  }
  deleteInArray(array: any[], id: string): any[] {
    const index = array.findIndex(item => item.id === id)
    if (index !== -1) {
      array.splice(index, 1)
    }
    return array
  }
}
