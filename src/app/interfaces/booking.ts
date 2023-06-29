import {User} from "./user";
import {Car} from "./car";

export interface Booking {
  [key: string]: any
  id: number;
  dateBookingStart: string;
  dateBookingEnd: string;
  status: number;
  user: User;
  car: Car;
}
