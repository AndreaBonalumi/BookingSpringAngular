import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../interfaces/user";
import {UserService} from "../../services/user.service";
import {MyHeaders} from "../../interfaces/my-headers";
import {formUser} from "../../configurations/forms";

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit{

  formUser: MyHeaders[] = formUser;
  user !: User
  id !: string | null
  errors: MyHeaders[] = [];
  error: string = '';
  showPasswordForm: boolean = false;
  constructor(private router: Router, private userService: UserService, private activeRoute: ActivatedRoute) {}
  ngOnInit() {
    this.id = this.activeRoute.snapshot.paramMap.get("id")
    this.userService.getUser().subscribe((user: User) => {
      if (this.id == null && user.admin) {
        this.user = {
          admin: false,
          email: "",
          firstName: "",
          lastName: "",
          drivingLicense: "",
          password: "",
          username: "",
          profilePhoto: null,
          photo: null,
          createdBy: user.idUser
        }
      } else {
        this.userService.getUserById(Number(this.id)!).subscribe({
          next: user => this.user = user,
          error: err => localStorage.clear()
        })
      }
    })
  }

  onEmit(user: User) {
    this.user = user
    this.showPasswordForm = true;
  }

  manageUser() {
    if (this.user.idUser != null && this.user.idUser != 0) {
      this.userService.checkUser(this.user.username, this.user.password).subscribe({
        next: () => {
          this.insertUser()
        },
        error: err => {
          this.error = err.error.message
        }
      })
    } else {
      this.insertUser()
    }
  }

  insertUser() {
    this.userService.insertUser(this.user).subscribe({
      next: (userIns: User) => {
        if (this.user.photo && userIns.idUser) {

          this.userService.upload(this.user.photo, userIns.idUser).subscribe()
        }
        this.router.navigate(['home'])
      },
      error: err => {
        this.showPasswordForm = false
        for (let fieldName in err.error.errorMap) {
          let errorMessage = err.error.errorMap[fieldName];
          this.errors.push({key: fieldName, label: errorMessage});
        }
      }
    })
  }
}
