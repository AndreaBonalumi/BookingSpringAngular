import {Moment} from "moment";
import {User} from "./user";
import {Car} from "./car";

export interface Booking {
  [key: string]: any
  idBooking ?: number;
  start ?: Moment;
  end ?: Moment;
  status ?: any;
  userId: number;
  car ?: Car;
}
