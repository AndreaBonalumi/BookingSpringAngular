import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(items: any[], start: number, end: number, pagination: number, data: any): any[] {

    if (data != undefined) {
      if (items != undefined) {
        if (start < 0) {
          return items.slice(0, pagination)
        }
        if (start >= items.length) {
          return items.slice(items.length - pagination, items.length)
        }
        return items.slice(start, end)
      }
    }
    return []
  }
}
