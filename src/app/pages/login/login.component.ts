import {Component, OnInit} from '@angular/core';
import {Auth} from "../../interfaces/auth";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  auth: Auth = {
    username: '',
    password: ''
  }
  constructor(private userService: UserService, private route: Router) {
  }
  ngOnInit() {
    if (localStorage.getItem("jwtToken") != null ||
      localStorage.getItem("jwtToken") != "" ||
      localStorage.getItem("jwtToken") != undefined)
    {
      this.route.navigate(['home'])
    }
  }

  login() {
    this.userService.authenticate(this.auth).subscribe(response => {

      localStorage.setItem('jwtToken', response.jwt)
      localStorage.setItem('username', response.username)

      this.route.navigate(['home'])
    });
  }
}
