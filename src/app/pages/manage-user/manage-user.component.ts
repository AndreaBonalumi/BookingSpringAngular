import {Component, OnInit} from '@angular/core';
import {formUser} from "../../mock-dati";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../interfaces/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit{

  formUser = formUser;
  user !: User
  id !: string | null
  error: string = ''
  constructor(private router: Router, private userService: UserService, private activeRoute: ActivatedRoute) {}
  ngOnInit() {
    this.id = this.activeRoute.snapshot.paramMap.get("id")
    if (this.id == null) {
      this.userService.getUsername().subscribe(user => {
        this.user = {
          admin: false,
          email: "",
          firstName: "",
          lastName: "",
          drivingLicense: "",
          password: "",
          username: "",
          createdBy: user.idUser
        }
      })

    } else {
      this.userService.getUserById(Number(this.id)!).subscribe({
        next: user => this.user = user,
        error: err => localStorage.clear()
      })
    }
  }

  manageUser(user: User) {
    this.userService.insertUser(user).subscribe({
      next: () => this.router.navigate(['home']),
      error: err => this.error = err.error
    })
  }
}
