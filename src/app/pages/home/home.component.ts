import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  @Input() userLogger !: User;

  constructor(private router: Router) {}
  ngOnInit() {
    if (this.userLogger === undefined || this.userLogger === null) {
      this.router.navigate(['login'])
    }
  }
}
