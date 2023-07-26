import {MyHeaders} from "../interfaces/my-headers";

export const carHeaders: MyHeaders[] = [
  {key: "plate", label: "Targa", required: true},
  {key: "brand", label: "Marca", required: true},
  {key: "model", label: "Modello", required: true},
  {key: "color", label: "Colore", required: true},
  {key: "description", label: "Descrizione *", required: true},
  {key: "link", label: "Link foto", required: false},
  {key: "year", label: "Anno"}
];
export const bookingHeaders: MyHeaders[] = [
  {key: "start", label: "Inizio", required: true},
  {key: "end", label: "Fine", required: true},
  {key: "status", label: "Stato"},
  {key: "car.brand", label: "Marca"},
  {key: "car.model", label: "Modello"},
  {key: "car.color", label: "colore"},
];
export const userHeaders: MyHeaders[] = [
  {key: "firstName", label: "Nome"},
  {key: "lastName", label: "Cognome"},
  {key: "username", label: "Username"},
  {key: "email", label: "E-mail"},
  {key: "drivingLicense", label: "Patente"}
];
