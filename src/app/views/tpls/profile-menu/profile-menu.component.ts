import { Component, OnInit } from '@angular/core';
import { BaseMethodsService } from 'src/app/services/base/base-methods.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent implements OnInit {

  constructor(
    public userService: UserService,
    public baseCtrl: BaseMethodsService) { }

  ngOnInit(): void {
  }

}
