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
  username !: string | null
  user ?: User
  constructor(private userService: UserService) {
  }
  ngAfterContentChecked(): void {
    if (localStorage.getItem("username") != this.username) {
      this.username = localStorage.getItem("username")
      this.fetchUser()
    }
  }

  ngOnInit(): void {
    this.username = localStorage.getItem("username")
    this.fetchUser()
  }

  fetchUser() {
    if (this.username != null || this.username != undefined || this.username ? this.username!.trim() != "" : false) {

      this.userService.getByUsername(localStorage.getItem("username")!)
        .subscribe({
          next: user => this.user = user,
          error: err => {
            localStorage.clear()
            this.username = null
          }
        })
    }
  }

  logout() {
    localStorage.clear()
  }
}
