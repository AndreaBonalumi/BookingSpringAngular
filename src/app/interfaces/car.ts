import {Moment} from "moment";

export interface Car {
  [key: string]: any
  id: string;
  brand: string;
  model: string;
  color: string;
  description: string;
  link: string;
  created ?: Moment;
  year: number;
}
