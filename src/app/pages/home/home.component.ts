import {Component, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {ActivatedRoute, Router} from "@angular/router";
import {DatiService} from "../../services/dati.service";
import {Car} from "../../interfaces/car";
import {Booking} from "../../interfaces/booking";
import {MyHeaders} from "../../interfaces/my-headers";
import {bookingHeaders, userHeaders} from "../../mock-dati";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  userLogger !: User;
  id !: string | null;
  users ?: User[];
  bookings ?: Booking[];
  headers !: MyHeaders[];
  cars: Car[] = [];
  constructor(private router: Router, private activeRoute: ActivatedRoute, private datiService: DatiService) {}
  ngOnInit() {

    //this.id = this.activeRoute.snapshot.paramMap.get("id")

    this.datiService.getUserById("1").subscribe(user => {
      this.userLogger = user
      if (this.userLogger.admin) {
        this.datiService.getUsers().subscribe(users => this.users = users)
        this.headers = userHeaders;
      } else {
        this.datiService.getUserBookings("1").subscribe(userBookings => {
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
}
