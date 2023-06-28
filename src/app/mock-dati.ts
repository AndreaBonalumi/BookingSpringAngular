import { MyTableConfig} from "./interfaces/my-table-config";
import { MyTableActionEnum} from "./interfaces/my-table-action-enum";
import {Car} from "./interfaces/car";
import {MyHeaders} from "./interfaces/my-headers";
export const TABLE : MyTableConfig = {
  headers: [],
  order: {
    colonna: 'id',
    verso: 'asc',
  },
  search: {columns: []},
  pagination: {itemPerPage: 3, itemPerPageOption: [2, 5, 7, 4, 3]},
  actions: [
    { onTop: true,
      buttonAction: {
        text: MyTableActionEnum.NEW_ROW,
        icon: 'postcard',
        class: 'primary'
      },
    },
    { onTop: false,
      buttonAction: {
        text: MyTableActionEnum.EDIT,
        icon: 'pencil',
        class: 'secondary'
      },
    },
    { onTop: false,
      buttonAction: {
        text: MyTableActionEnum.DELETE,
        icon: 'trash3',
        class: 'secondary'
      }
    },
  ],
}
export const userHeaders: MyHeaders[] = [
  {key: "firstName", label: "Nome"},
  {key: "lastName", label: "Cognome"},
  {key: "username", label: "Username"},
  {key: "email", label: "E-mail"},
  {key: "admin", label: "Admin"},
  {key: "nPatente", label: "Patente"},
];
export const carHeaders: MyHeaders[] = [
  {key: "brand", label: "Marca"},
  {key: "model", label: "Modello"},
  {key: "color", label: "Colore"},
  {key: "description", label: "Descrizione"},
  {key: "link", label: "Link foto"},
  {key: "year", label: "Anno"},
];
export const bookingHeaders: MyHeaders[] = [
  {key: "dateBookingStart", label: "Inizio"},
  {key: "dateBookingEnd", label: "Fine"},
  {key: "Car", label: "Macchina"},
];
