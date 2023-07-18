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
  username: string | null = null
  user ?: User
  constructor(private userService: UserService) {
  }
  ngAfterContentChecked(): void {
    if (sessionStorage.getItem("username") != null) {
      if (this.username == null) {
        this.username = sessionStorage.getItem("username")
        this.fetchUser()
      } else {
        sessionStorage.clear()
      }
    }
  }

  ngOnInit(): void {

    if (!sessionStorage.getItem("username")) {
      if (localStorage.getItem("jwtToken")){

        this.userService.getUsername().subscribe({
          next: user => {
            sessionStorage.setItem("username", user.username)
            this.username = user.username
            this.fetchUser()
          },
          error: err => {
            console.log(err)
            localStorage.clear()
            sessionStorage.clear()
          }
        })
      }
    }
  }

  fetchUser() {
    if (this.username != null || this.username != "") {

      this.userService.getByUsername(this.username!)
        .subscribe({
          next: user => {
            this.user = user
          },
          error: err => {
            console.log(err)
            localStorage.clear()
            sessionStorage.clear()
          }
        })
    }
  }

  logout() {
    localStorage.clear()
    sessionStorage.clear()
  }
}
