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
  token: string = ''
  constructor(private userService: UserService, private route: Router) {
  }
  ngOnInit() {
    if (localStorage.getItem("jwtToken")) {
      this.route.navigate(['home'])
    }
  }

  login() {
    this.userService.authenticate(this.auth).subscribe(respone => {

      this.token = respone
      localStorage.setItem('jwtToken', this.token)

      this.route.navigate(['home'])
    });
  }
}
