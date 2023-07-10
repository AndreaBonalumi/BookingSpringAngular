import {Component, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {ConfigButton} from "../../interfaces/config-button";
import {MyHeaders} from "../../interfaces/my-headers";
import {userHeaders} from "../../mock-dati";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

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
  constructor(private userService: UserService, private router: Router) {
  }
  ngOnInit() {
    this.userService.getUserById(2).subscribe(user => this.user = user)
  }
  emit() {
    this.router.navigate(['manageUser/' + this.user.id])
  }
}
