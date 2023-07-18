export interface Car {
  [key: string]: any
  idCar ?: number;
  plate: string
  brand: string;
  model: string;
  color: string;
  description: string;
  link: string;
  year: number | undefined;
  createdBy ?: number;
}
