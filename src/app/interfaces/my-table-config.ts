import {MyHeaders} from "./my-headers";
import {Ordinamento} from "./ordinamento";
import {MySearch} from "./my-search";
import {MyPagination} from "./my-pagination";
import {ButtonInterface} from "../../../../button-custom/src/app/buttonInterface";
export interface MyTableConfig {
  headers: MyHeaders[];
  order: Ordinamento;
  search: MySearch;
  pagination: MyPagination;
  actions: ActionConfig[];
}
export interface ActionConfig {
  onTop: boolean;
  buttonAction: ButtonInterface;
  hidden ?: Function;
}
