import { Component } from '@angular/core';
import {MyHeaders} from "../../interfaces/my-headers";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  passwordRequest = {
    oldPassword: '',
    newPassword: '',
    newPasswordR: ''
  }
  error: string = ''
  errors: MyHeaders[] = []
  success: boolean = false
  constructor(private userService: UserService) {
  }
  savePassword() {
    this.userService.changePassword(this.passwordRequest).subscribe({
      next: () => {
        this.success = true
        this.passwordRequest = {
          oldPassword: '',
          newPassword: '',
          newPasswordR: '',
        }
      },
      error: err => {
        if (err.error.errorMap){
          for (let fieldName in err.error.errorMap) {
            let errorMessage = err.error.errorMap[fieldName];
            this.errors.push({key: fieldName, label: errorMessage});
          }
        } else {
          this.error = err.error.message
        }
      }
    })
  }
}
