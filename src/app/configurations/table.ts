import {MyTableConfig} from "../interfaces/my-table-config";
import {MyTableActionEnum} from "../interfaces/my-table-action-enum";
import * as dayjs from "dayjs";
import {bookingHeaders, carHeaders} from "./headers";

export const TABLE: MyTableConfig = {
  headers: [],
  order: {
    colonna: 'id',
    verso: 'asc',
  },
  search: {columns: []},
  pagination: {itemPerPage: 3, itemPerPageOption: [2, 5, 7, 4, 3]},
  actions: [
    {
      onTop: true,
      buttonAction: {
        text: 'Nuovo',
        icon: 'bi bi-postcard',
        class: 'btn btn-primary'
      },
      action: MyTableActionEnum.NEW_ROW
    },
    {
      onTop: false,
      buttonAction: {
        text: 'Modifica',
        icon: 'bi bi-pencil',
        class: 'btn btn-secondary'
      },
      action: MyTableActionEnum.EDIT,
      hidden: (booking: any): boolean => {
        if (booking.start == null)
          return false
        let today = dayjs()
        return !today.add(2, 'day').isBefore(booking.start!.toString());
      }
    },
    {
      onTop: false,
      buttonAction: {
        text: 'Cancella',
        icon: 'bi bi-trash3',
        class: 'btn btn-secondary'
      },
      action: MyTableActionEnum.DELETE,
      hidden: (booking: any): boolean => {
        if (booking.start == null)
          return false
        let today = dayjs()
        return !today.add(2, 'day').isBefore(booking.start!.toString());
      }
    },
  ],
}
export const TABLEBOOKING: MyTableConfig = {
  headers: bookingHeaders,
  order: {
    colonna: 'id',
    verso: 'asc',
  },
  search: {columns: bookingHeaders},
  pagination: {itemPerPage: 3, itemPerPageOption: [2, 5, 7, 4, 3]},
  actions: [
    {
      onTop: false,
      buttonAction: {
        text: 'Approva',
        icon: 'bi bi-postcard',
        class: 'btn btn-primary'
      },
      action: MyTableActionEnum.APPROVE
    },
    {
      onTop: false,
      buttonAction: {
        text: 'Rifiuta',
        icon: 'bi bi-pencil',
        class: 'btn btn-secondary'
      },
      action: MyTableActionEnum.DECLINE
    },
  ]
}
export const TABLECAR: MyTableConfig = {
  headers: carHeaders,
  order: {
    colonna: 'id',
    verso: 'asc',
  },
  search: {columns: bookingHeaders},
  pagination: {itemPerPage: 3, itemPerPageOption: [2, 5, 7, 4, 3]},
  actions: []
}
