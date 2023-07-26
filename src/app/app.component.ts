import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {User} from "./interfaces/user";
import {UserService} from "./services/user.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked{
  title = 'BookingSpringAngular';
  token: string | null = null
  user ?: User
  logoutFlag: boolean = false
  noAuthFlag: boolean = false
  constructor(private userService: UserService) {
  }
  ngAfterContentChecked(): void {
    if (localStorage.getItem("jwtToken") == null && this.token != null) {
      this.noAuthFlag = true
    }
    if (localStorage.getItem("jwtToken") != this.token) {
      this.token = localStorage.getItem("jwtToken")
      if (this.token != null) {
        this.fetchUser()
      }
    }
  }

  ngOnInit(): void {

    if (localStorage.getItem("jwtToken")){
      this.token = localStorage.getItem("jwtToken")
      this.fetchUser()
    }
  }

  fetchUser() {
    this.logoutFlag = false;
    this.noAuthFlag = false;

    if (this.token != null || this.token != "") {

      this.userService.getUser()
        .subscribe({
          next: user => {
            this.user = user
          },
          error: () => {
            localStorage.clear()
          }
        })
    }
  }

  logout() {
    this.logoutFlag = true
    this.token = null
    localStorage.clear()
  }
}
