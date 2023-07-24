import {Component, Input, OnInit} from '@angular/core';
import {Auth} from "../../interfaces/auth";
import {UserService} from "../../services/user.service";
import { Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() logout !: boolean
  @Input() noAuth !: boolean
  auth: Auth = {
    username: '',
    password: ''
  }
  authFail: string = ''
  constructor(private userService: UserService, private route: Router) {
  }
  ngOnInit() {

    console.log("branching1")
    console.log("branching2")

    console.log("commit main 1")
    console.log("commit main 2")

    console.log("commit main 4")
    console.log("commit main 5")

    console.log("commit branch 3")
    console.log("commit branch 4")

    console.log("commit main 1")

    if ((localStorage.getItem("jwtToken") != null ||
      localStorage.getItem("jwtToken") != "" ||
      localStorage.getItem("jwtToken") != undefined))
    {
      this.route.navigate(['home'])
    }
  }

  login() {
    this.userService.authenticate(this.auth).subscribe({
      next: response => {
        localStorage.setItem('jwtToken', response.jwt)
        this.route.navigate(['home'])
      },
      error: err => {
        this.authFail=  err.error
      }
    });
  }
}
