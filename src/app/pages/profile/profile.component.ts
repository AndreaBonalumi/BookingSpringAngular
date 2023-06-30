import {Component, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {ConfigButton} from "../../interfaces/config-button";
import {DatiService} from "../../services/dati.service";
import {MyHeaders} from "../../interfaces/my-headers";
import {userHeaders} from "../../mock-dati";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  user !: User;
  userField: MyHeaders[] = userHeaders;
  editButton: ConfigButton = {
    icon: "pencil-square",
    class: "btn btn-primary",
    text: "Modifica"
  }
  isEdit: boolean = false
  constructor(private datiService: DatiService, private router: Router) {
  }
  ngOnInit() {
    this.datiService.getUserById("2").subscribe(user => this.user = user)
  }
  emit() {
    this.router.navigate(['manageUser/' + this.user.id])
  }
}
