import {Moment} from "moment";
export interface User {
  [key: string]: any
  id: bigint;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  birthday ?: Moment;
  admin: boolean;
  drivingLicense: string;
}
