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
    if (this.id === '-1') {
      this.user = new class implements User {
        [key: string]: any;

        admin: boolean = false;
        birthday: string = "";
        created: string = "";
        email: string = "";
        firstName: string = "";
        id: string = "";
        lastName: string = "";
        nPatente: string  = "";
        password: string  = "";
        username: string  = "";
      }
    } else {
      this.datiService.getUserById((this.id)!).subscribe(user => this.user = user)
    }
  }

  manageUser(user: User) {
    if (this.id === '-1') {
      user.created = 'today'
      user.email = user.firstName.toLowerCase().trim() + '.' + user.lastName.toLowerCase().trim() + '@si2001.it'
      this.datiService.insertUser(user).subscribe(() => this.router.navigate(['home']))
    } else {
      this.datiService.editUser(user).subscribe(() => this.router.navigate(['home']))
    }
  }
}
