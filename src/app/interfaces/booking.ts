import {Moment} from "moment";
import {StatusEnum} from "./status-enum";
import {User} from "./user";
import {Car} from "./car";

export interface Booking {
  [key: string]: any
  idBooking ?: number;
  start ?: Moment;
  end ?: Moment;
  status ?: StatusEnum;
  user: User;
  car ?: Car;
}
