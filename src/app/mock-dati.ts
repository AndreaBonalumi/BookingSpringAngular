import { MyTableConfig} from "./interfaces/my-table-config";
import { MyTableActionEnum} from "./interfaces/my-table-action-enum";
import {User} from "./interfaces/user";
import {Car} from "./interfaces/car";
export const TABLE : MyTableConfig = {
  headers: [
    {key: 'id', label: 'ID'},
    {key: 'label', label: 'Nome'},
    {key: 'role', label: 'Ruolo'}
  ],
  order: {
    colonna: 'id',
    verso: 'asc',
  },
  search: {columns: ['label', 'role']},
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
    { onTop: false,
      buttonAction: {
        text: 'Cambia ruolo',
        icon: 'arrow-downward',
        class: 'primary'
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
export const CARS: Car[] = [
  {
    id: 1,
    brand: "Lamborghini",
    model: "Huracan",
    color: "orange",
    description: "bella",
    link: "",
    year: 2023,
    created: ""
  },
  {
    id: 2,
    brand: "Fiat",
    model: "500",
    color: "gray",
    description: "100cc 3 porte",
    link: "",
    year: 2011,
    created: ""
  },
]
