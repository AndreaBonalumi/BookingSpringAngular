import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {User} from "./interfaces/user";
import {UserService} from "./services/user.service";
import {DomSanitizer} from "@angular/platform-browser";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked{
  title = 'BookingSpringAngular';
  token: string | null = null
  user ?: User
  profilePhoto: any
  logoutFlag: boolean = false
  noAuthFlag: boolean = false
  currentPage: string = ''
  constructor(private userService: UserService, private sanitizer: DomSanitizer, private router: Router) {
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

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentPage = event.url
      }
    });

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
            if (this.user!.profilePhoto) {
              this.userService.getProfileImage(user.idUser).subscribe(blob => {
                let objectURL = URL.createObjectURL(blob);
                this.profilePhoto = this.sanitizer.bypassSecurityTrustUrl(objectURL);
              });
            }
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
