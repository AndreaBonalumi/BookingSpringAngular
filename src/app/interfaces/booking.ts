import {User} from "./user";
import {Car} from "./car";

export interface Booking {
  id: number;
  dateBookingStart: Date;
  dateBookingEnd: Date;
  user: User;
  cat: Car;
}
