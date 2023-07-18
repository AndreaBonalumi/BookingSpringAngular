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
  constructor(private userService: UserService) {
  }
  ngAfterContentChecked(): void {
    if (localStorage.getItem("jwtToken") != this.token) {
      this.token = localStorage.getItem("jwtToken")
      this.fetchUser()
    }
  }

  ngOnInit(): void {

    if (localStorage.getItem("jwtToken")){
      this.token = localStorage.getItem("jwtToken")
      this.fetchUser()
    }
  }

  fetchUser() {
    if (this.token != null || this.token != "") {

      this.userService.getUsername()
        .subscribe({
          next: user => {
            this.user = user
          },
          error: err => {
            console.log(err)
            localStorage.clear()
          }
        })
    }
  }

  logout() {
    localStorage.clear()
  }
}
