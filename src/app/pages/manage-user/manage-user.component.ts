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

  manageUser(form: NgForm) {
    this.datiService.getUserByUsername(form.value.username).subscribe(user => {

      this.user.username = form.value.username
      this.user.password = form.value.password
      this.user.firstName = form.value.firstName
      this.user.lastName = form.value.lastName
      this.user.nPatente = form.value.nPatente
      this.user.birthday = form.value.birthday
      this.user.email = form.value.username + '.' + form.value.lastName + '@si2001.it'
      this.user.created = 'today'
      this.user.admin = false;

      if (user.size > 0) {
        this.datiService.editUser(user).subscribe(() => this.router.navigate(['home']))
      } else {
        this.datiService.insertUser(user).subscribe(() => this.router.navigate(['home']))
      }
    })
  }
}
