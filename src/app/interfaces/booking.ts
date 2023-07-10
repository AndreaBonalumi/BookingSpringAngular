import {Moment} from "moment";
import {StatusEnum} from "./status-enum";

export interface Booking {
  [key: string]: any
  id ?: number;
  dateBookingStart ?: Moment;
  dateBookingEnd ?: Moment;
  status ?: StatusEnum;
  userId: number;
  carId ?: number;
}
