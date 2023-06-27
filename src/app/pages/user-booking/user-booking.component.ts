import {Component, Input} from '@angular/core';
import {User} from "../../interfaces/user";

@Component({
  selector: 'app-user-booking',
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.css']
})
export class UserBookingComponent {

  @Input() user: User | undefined;
}
