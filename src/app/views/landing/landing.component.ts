import { Component, OnInit } from '@angular/core';
import {BaseMethodsService} from "../../services/base/base-methods.service";
import {UserService} from "../../services/user/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(public baseCtrl: BaseMethodsService, public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getBlogList();
    this.userService.getLandingContent();
  }
}
