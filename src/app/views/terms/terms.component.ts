import { Component, OnInit } from '@angular/core';
import { BaseMethodsService } from 'src/app/services/base/base-methods.service';
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  constructor(public userService: UserService, public base: BaseMethodsService) { }

  ngOnInit(): void {
    this.userService.getLandingContent();
  }

}
