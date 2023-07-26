import {Moment} from "moment";
export interface User {
  [key: string]: any
  idUser ?: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  birthday ?: Moment;
  admin: boolean;
  profilePhoto: string | null;
  photo: File | null;
  drivingLicense ?: string;
  createdBy ?: number;
}
