import {Moment} from "moment";
export interface User {
  [key: string]: any
  id ?: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  birthday ?: Moment;
  admin: boolean;
  drivingLicense: string;
}
