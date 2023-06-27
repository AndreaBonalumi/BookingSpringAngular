import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'order'
})
export class OrdinamentoPipe implements PipeTransform {
  transform(items: any[], verso: string, column: string): any[] {
    return items.sort((a, b) => {
      if (a[column] < b[column]) {
        return verso === 'asc' ? -1 : 1;
      } else if (a[column] > b[column]) {
        return verso === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
}
