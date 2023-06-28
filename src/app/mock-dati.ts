import { MyTableConfig} from "./interfaces/my-table-config";
import { MyTableActionEnum} from "./interfaces/my-table-action-enum";
import {User} from "./interfaces/user";
import {Car} from "./interfaces/car";
import {Booking} from "./interfaces/booking";
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
      },
      hidden: (item: any): boolean => {
        return item['role'] == 'admin';
      },
    },
  ],
}

export const USERS: User[] = [
  {
    id: 1,
    firstName: "admin",
    lastName: "admin",
    username: "admin",
    password: "admin1",
    admin: true,
    birthday: "",
    created: "",
    nPatente: "",
  },
  {
    id: 2,
    firstName: "andrea",
    lastName: "bonalumi",
    username: "andrea.bonalumi",
    password: "1234",
    admin: false,
    birthday: "admin1",
    created: "admin1",
    nPatente: "",
  },
]
export const CARS: Car[] = [];
export const CARSFILL: Car[] = [
  {
    id: 1,
    brand: "Lamborghini",
    model: "Huracan",
    color: "Orange",
    description: "1",
    link: "",
    created: "",
    year: 2023,
  },
  {
    id: 2,
    brand: "Lamborghini",
    model: "Huracan",
    color: "Orange",
    description: "2",
    link: "",
    created: "",
    year: 2023,
  },
  {
    id: 3,
    brand: "Lamborghini",
    model: "Huracan",
    color: "Orange",
    description: "3",
    link: "",
    created: "",
    year: 2023,
  },
  {
    id: 4,
    brand: "Lamborghini",
    model: "Huracan",
    color: "Orange",
    description: "4",
    link: "",
    created: "",
    year: 2023,
  },
  {
    id: 5,
    brand: "Lamborghini",
    model: "Huracan",
    color: "Orange",
    description: "5",
    link: "",
    created: "",
    year: 2023,
  },
  {
    id: 6,
    brand: "Lamborghini",
    model: "Huracan",
    color: "Orange",
    description: "6",
    link: "",
    created: "",
    year: 2023,
  },
];
export const BOOKINGS: Booking[] = [];
export const userHeaders: MyHeaders[] = [
  {key: "firstName", label: "Nome"},
  {key: "lastName", label: "Cognome"},
  {key: "username", label: "Username"},
  {key: "email", label: "E-mail"},
  {key: "admin", label: "Admin"},
  {key: "nPatente", label: "Patente"},
]
;export const carHeaders: MyHeaders[] = [
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
