import {Component, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {ConfigButton} from "../../interfaces/config-button";
import {MyHeaders} from "../../interfaces/my-headers";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {DomSanitizer} from "@angular/platform-browser";
import {profileUser, userHeaders} from "../../configurations/headers";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  user !: User;
  userFields: MyHeaders[] = profileUser;
  pathImage: any
  editButton: ConfigButton = {
    icon: "bi bi-pencil-square",
    class: "btn btn-secondary",
    text: "Modifica"
  }
  constructor(private userService: UserService, private router: Router, private sanitizer: DomSanitizer) {
  }
  ngOnInit() {
    this.userService.getUser().subscribe(
      user => {
        this.user = user;
        this.userService.getProfileImage(user.idUser).subscribe(blob => {
          let objectURL = URL.createObjectURL(blob);
          this.pathImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
      }
    );
  }
  emit() {
    this.router.navigate(['manageUser/' + this.user.idUser])
  }
}
