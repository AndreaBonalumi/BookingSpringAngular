import { MyTableConfig} from "./interfaces/my-table-config";
import { MyTableActionEnum} from "./interfaces/my-table-action-enum";
import {Car} from "./interfaces/car";
import {MyHeaders} from "./interfaces/my-headers";
export const TABLEADMIN : MyTableConfig = {
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
export const TABLEUSER : MyTableConfig = {
  headers: [],
  order: {
    colonna: 'id',
    verso: 'asc',
  },
  search: {columns: []},
  pagination: {itemPerPage: 3, itemPerPageOption: [2, 5, 7, 4, 3]},
  actions: [
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
  {key: "brand", label: "Marca", required: true},
  {key: "model", label: "Modello", required: true},
  {key: "color", label: "Colore", required: true},
  {key: "description", label: "Descrizione", required: true},
  {key: "link", label: "Link foto", required: false},
  {key: "year", label: "Anno"},
];
export const bookingHeaders: MyHeaders[] = [
  {key: "dateBookingStart", label: "Inizio", required: true},
  {key: "dateBookingEnd", label: "Fine", required: true},
  {key: "Car", label: "Macchina"},
];

export const formUser: MyHeaders[] = [
  {key: 'firstName', label: 'Nome', required: true},
  {key: 'lastName', label: 'Cognome', required: true},
  {key: 'username', label: 'Username', required: true},
  {key: 'password', label: 'Password', required: true},
  {key: 'nPatente', label: 'Patente'},
  {key: 'birthday', label: 'Data di nascita'},
]
export const TABLEBOOKING : MyTableConfig = {
  headers: bookingHeaders,
  order: {
    colonna: 'id',
    verso: 'asc',
  },
  search: {columns: bookingHeaders},
  pagination: {itemPerPage: 3, itemPerPageOption: [2, 5, 7, 4, 3]},
  actions: [
    { onTop: false,
      buttonAction: {
        text: MyTableActionEnum.APPROVE,
        icon: 'postcard',
        class: 'primary'
      },
    },
    { onTop: false,
      buttonAction: {
        text: MyTableActionEnum.DECLINE,
        icon: 'pencil',
        class: 'secondary'
      },
    },
  ]
}
export const TABLECAR : MyTableConfig = {
  headers: bookingHeaders,
  order: {
    colonna: 'id',
    verso: 'asc',
  },
  search: {columns: bookingHeaders},
  pagination: {itemPerPage: 3, itemPerPageOption: [2, 5, 7, 4, 3]},
  actions: []
}
