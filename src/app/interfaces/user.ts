import {Moment} from "moment";
import {Dayjs} from "dayjs";

export interface User {
  [key: string]: any
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  created ?: Moment;
  birthday ?: Moment;
  admin: boolean;
  nPatente: string;
}
