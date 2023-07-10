import {Moment} from "moment";
import {StatusEnum} from "./status-enum";

export interface Booking {
  [key: string]: any
  idBooking ?: number;
  dateBookingStart ?: Moment;
  dateBookingEnd ?: Moment;
  status ?: StatusEnum;
  userId: number;
  carId ?: number;
}
