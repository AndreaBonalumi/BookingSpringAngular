import {Component, OnInit} from '@angular/core';
import {Auth} from "../../interfaces/auth";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

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
  authFail: boolean = false
  noAuth: boolean = false
  logout: boolean = false
  constructor(private userService: UserService, private route: Router, private activeRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.logout = this.activeRoute.snapshot.paramMap.has("logout")
    this.noAuth = this.activeRoute.snapshot.paramMap.has("noAuth")
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
      error: () => this.route.navigate(['login?logout=true'])

    });
  }
}
