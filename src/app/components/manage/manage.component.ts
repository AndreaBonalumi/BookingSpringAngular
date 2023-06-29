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
  @Output() emit: EventEmitter<any> = new EventEmitter<any>()
}
