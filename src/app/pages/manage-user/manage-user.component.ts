import {Component, OnInit} from '@angular/core';
import {formUser} from "../../mock-dati";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DatiService} from "../../services/dati.service";
import {User} from "../../interfaces/user";

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit{

  formUser = formUser;
  user !: User
  id !: string | null
  constructor(private router: Router, private datiService: DatiService, private activeRoute: ActivatedRoute) {}
  ngOnInit() {
    this.id = this.activeRoute.snapshot.paramMap.get("id")
    if (this.id == null) {
      this.user = {
        admin: false,
        birthday: "",
        created: "",
        email: "",
        firstName: "",
        id: "",
        lastName: "",
        nPatente: "",
        password: "",
        username: ""
      }
    } else {
      this.datiService.getUserById((this.id)!).subscribe(user => this.user = user)
    }
  }

  manageUser(user: User) {
    user.email = user.firstName.toLowerCase().trim() + '.' + user.lastName.toLowerCase().trim() + '@si2001.it'

    if (this.user.id) {
      this.datiService.editUser(user).subscribe(() => this.router.navigate(['home']))
    } else {
      user.created = 'today'
      this.datiService.insertUser(user).subscribe(() => this.router.navigate(['home']))
    }
  }
}
