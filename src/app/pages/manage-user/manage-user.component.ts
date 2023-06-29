import { Component } from '@angular/core';
import {formUser} from "../../mock-dati";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {DatiService} from "../../services/dati.service";
import {User} from "../../interfaces/user";

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent {

  formUser = formUser;
  user !: User
  constructor(private router: Router, private datiService: DatiService) {
  }

  manageUser(user: User) {
    this.datiService.getUserByUsername(user.username).subscribe(user => {

      this.user.email = user.username + '.' + user.lastName + '@si2001.it'
      this.user.admin = false;

      if (user.size > 0) {
        this.datiService.editUser(user).subscribe(() => this.router.navigate(['home']))
      } else {
        this.user.created = 'today'
        this.datiService.insertUser(user).subscribe(() => this.router.navigate(['home']))
      }
    })
  }
}
