import {MyTableConfig} from "./interfaces/my-table-config";
import {MyTableActionEnum} from "./interfaces/my-table-action-enum";
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
        text: 'Nuovo',
        icon: 'postcard',
        class: 'primary'
      },
      action: MyTableActionEnum.NEW_ROW
    },
    { onTop: false,
      buttonAction: {
        text: 'Modifica',
        icon: 'pencil',
        class: 'secondary'
      },
      action: MyTableActionEnum.EDIT
    },
    { onTop: false,
      buttonAction: {
        text: 'Cancella',
        icon: 'trash3',
        class: 'secondary'
      },
      action: MyTableActionEnum.DELETE
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
        text: 'Modifica',
        icon: 'pencil',
        class: 'secondary'
      },
      action: MyTableActionEnum.EDIT
    },
    { onTop: false,
      buttonAction: {
        text: 'Cancella',
        icon: 'trash3',
        class: 'secondary'
      },
      action: MyTableActionEnum.DELETE
    },
  ],
}
export const userHeaders: MyHeaders[] = [
  {key: "firstName", label: "Nome"},
  {key: "lastName", label: "Cognome"},
  {key: "username", label: "Username"},
  {key: "email", label: "E-mail"},
  {key: "admin", label: "Admin"},
  {key: "drivingLicense", label: "Patente"},
];
export const carHeaders: MyHeaders[] = [
  {key: "plate", label: "Targa", required: true},
  {key: "brand", label: "Marca", required: true},
  {key: "model", label: "Modello", required: true},
  {key: "color", label: "Colore", required: true},
  {key: "description", label: "Descrizione", required: true},
  {key: "link", label: "Link foto", required: false},
  {key: "year", label: "Anno"},
];
export const bookingHeaders: MyHeaders[] = [
  {key: "start", label: "Inizio", required: true},
  {key: "end", label: "Fine", required: true},
  {key: "status", label: "Stato"},
  {key: "car.brand", label: "Marca"},
  {key: "car.model", label: "Modello"},
  {key: "car.color", label: "colore"},
];

export const formUser: MyHeaders[] = [
  {key: 'firstName', label: 'Nome', required: true},
  {key: 'lastName', label: 'Cognome', required: true},
  {key: 'username', label: 'Username', required: true},
  {key: 'password', label: 'Password', required: true, type: "password"},
  {key: 'drivingLicense', label: 'Patente'},
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
        text: 'Approva',
        icon: 'postcard',
        class: 'primary'
      },
      action: MyTableActionEnum.APPROVE
    },
    { onTop: false,
      buttonAction: {
        text: 'Rifiuta',
        icon: 'pencil',
        class: 'secondary'
      },
      action: MyTableActionEnum.DECLINE
    },
  ]
}
export const TABLECAR : MyTableConfig = {
  headers: carHeaders,
  order: {
    colonna: 'id',
    verso: 'asc',
  },
  search: {columns: bookingHeaders},
  pagination: {itemPerPage: 3, itemPerPageOption: [2, 5, 7, 4, 3]},
  actions: []
}
