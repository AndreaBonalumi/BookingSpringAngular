import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonInterface} from "../../../../../button-custom/src/app/buttonInterface";

@Component({
  selector: 'app-my-button',
  templateUrl: './my-button.component.html',
  styleUrls: ['./my-button.component.css']
})
export class MyButtonComponent{
  @Input() config !: ButtonInterface;
  @Input() typeButton : string = '';
  @Input() isDisabled : boolean = false;
  @Output() emitter : EventEmitter<any> = new EventEmitter<any>()
}
