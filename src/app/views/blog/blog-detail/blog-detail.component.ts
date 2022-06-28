import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  constructor(public userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const p = {
      Url: this.activatedRoute.snapshot.params['blogUrl']
    }
    this.userService.getBlogDetails(p);
  }

}
