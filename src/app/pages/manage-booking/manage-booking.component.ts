import {Component, Input} from '@angular/core';
import {User} from "../../interfaces/user";
import {Car} from "../../interfaces/car";

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent {

  @Input() user !: User;
  cars ?: Car[];

  saveBooking(event: Event) {

  }
}
