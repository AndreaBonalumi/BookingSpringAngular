import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MyHeaders} from "../../interfaces/my-headers";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent {

  @Input() fields !: MyHeaders[];
  @Input() item !: any
  @Input() errors: MyHeaders[] = []
  @Output() emit: EventEmitter<any> = new EventEmitter<any>()
  getErrorBorderColor(fieldName: string): string {
    if (this.errors.length > 0) {
      const error = this.errors.find(error => error.key === fieldName);
      return error ? 'border-color: #f00' : '';
    }
    return '';
  }

  changeFile(e: any, key: string) {
    this.item[key] = e.target.files[0]
  }

}
