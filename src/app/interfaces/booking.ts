import {User} from "./user";
import {Car} from "./car";
import {Moment} from "moment";

export interface Booking {
  [key: string]: any
  id: string;
  dateBookingStart: Moment | undefined;
  dateBookingEnd: Moment | undefined;
  status: number;
  //attenzione
  userId: string;
  carId ?: string;
}
