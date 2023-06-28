import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  @Input() userLogger !: User;

  constructor(private router: Router, private activeRoute: ActivatedRoute) {}
  ngOnInit() {

    let id = this.activeRoute.snapshot.paramMap.get("id")

    if (this.userLogger === undefined || this.userLogger === null) {
      this.router.navigate(['login'])
    }
  }
}
