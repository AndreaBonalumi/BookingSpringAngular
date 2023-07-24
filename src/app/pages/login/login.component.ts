import {Component, Input, OnInit} from '@angular/core';
import {Auth} from "../../interfaces/auth";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() logout !: boolean
  @Input() noAuth !: boolean
  auth: Auth = {
    username: '',
    password: ''
  }
  authFail: string = ''
  constructor(private userService: UserService, private route: Router, private activeRoute: ActivatedRoute) {
  }
  ngOnInit() {

    console.log("prova di branching e rebasing (commit su master)")
    console.log("prova di branching e committing più cose (secondo commit di master)")
    console.log("prova di branching e solo commit, senza push")
    console.log("prova di branching e rebasing")
    console.log("prova di branching e committing più cose")
    console.log("prova di branching e solo commit, senza push")
    console.log("prova di branching e rebasing")
    console.log("prova di branching e committing più cose")
    console.log("prova di branching e solo commit, senza push")
    console.log("prova di branching e rebasing")
    console.log("prova di branching e committing più cose")
    console.log("prova di branching e solo commit, senza push")
    console.log("prova di branching e rebasing")
    console.log("prova di branching e committing più cose")
    console.log("prova di branching e solo commit, senza push")


    console.log("committing sul branch")
    console.log("altro commit sul branch")


    if ((localStorage.getItem("jwtToken") != null ||
      localStorage.getItem("jwtToken") != "" ||
      localStorage.getItem("jwtToken") != undefined))
    {
      this.route.navigate(['home'])
    }
  }

  login() {
    this.userService.authenticate(this.auth).subscribe({
      next: response => {
        localStorage.setItem('jwtToken', response.jwt)
        this.route.navigate(['home'])
      },
      error: err => {
        this.authFail=  err.error
      }
    });
  }
}
