import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../interfaces/user";
import {UserService} from "../../services/user.service";
import {MyHeaders} from "../../interfaces/my-headers";
import {formUser, formUserAdmin} from "../../configurations/forms";

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit{

  formUser !: MyHeaders[];
  user !: User
  id !: string | null
  errors: MyHeaders[] = [];
  constructor(private router: Router, private userService: UserService, private activeRoute: ActivatedRoute) {}
  ngOnInit() {
    this.id = this.activeRoute.snapshot.paramMap.get("id")
    this.userService.getUser().subscribe((user: User) => {
      if (user.admin) {
        this.formUser = formUserAdmin
      } else {
        this.formUser = formUser
      }
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

  manageUser(user: User) {
    console.log(user)
    this.userService.insertUser(user).subscribe({
      next: (userIns: User) => {
        if (user.photo && userIns.idUser) {

          this.userService.upload(user.photo, userIns.idUser).subscribe()
        }
        this.router.navigate(['home'])
      },
      error: err => {
        for (let fieldName in err.error.errorMap) {
          let errorMessage = err.error.errorMap[fieldName];
          this.errors.push({key: fieldName, label: errorMessage});
        }
      }
    })
  }
}
