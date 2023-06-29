export interface User {
  [key: string]: any
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  created: string;
  birthday: string;
  admin: boolean;
  nPatente: string;
}
