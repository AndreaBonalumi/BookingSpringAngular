import {User} from "./user";
import {Car} from "./car";
import {Moment} from "moment";

export interface Booking {
  [key: string]: any
  id: string;
  dateBookingStart ?: Moment;
  dateBookingEnd ?: Moment;
  status: number;
  //attenzione
  userId: string;
  carId ?: string;
  car ?: Car;
  user ?: User;
}
