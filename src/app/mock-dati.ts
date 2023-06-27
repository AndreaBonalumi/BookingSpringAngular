import { MyTableConfig} from "./interfaces/my-table-config";
import { MyTableActionEnum} from "./interfaces/my-table-action-enum";
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
