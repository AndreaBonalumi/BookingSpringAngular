import {Moment} from "moment";
import {StatusEnum} from "./status-enum";

export interface Booking {
  [key: string]: any
  id: bigint;
  dateBookingStart ?: Moment;
  dateBookingEnd ?: Moment;
  status: StatusEnum;
  userId: bigint;
  carId ?: bigint;
}
