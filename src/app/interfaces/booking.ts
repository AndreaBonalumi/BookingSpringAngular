import {User} from "./user";
import {Car} from "./car";

export interface Booking {
  id: number;
  dateBookingStart: string;
  dateBookingEnd: string;
  user: User;
  car: Car;
}
