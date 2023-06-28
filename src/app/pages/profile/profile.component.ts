import {Component, Input} from '@angular/core';
import {User} from "../../interfaces/user";
import {ConfigButton} from "../../interfaces/config-button";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  @Input() user !: User;
  @Input() userField !: string[];
  editButton: ConfigButton = {
    icon: "pencil-square",
    class: "btn btn-primary",
    text: "Modifica"
  }
}
