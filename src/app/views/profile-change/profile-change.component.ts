import { Component, OnInit } from '@angular/core';
import { BaseMethodsService } from 'src/app/services/base/base-methods.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile-change',
  templateUrl: './profile-change.component.html',
  styleUrls: ['./profile-change.component.scss']
})
export class ProfileChangeComponent implements OnInit {
  submitted = false
  constructor(public userService: UserService, public baseCtrl: BaseMethodsService) { }

  ngOnInit(): void {
    this.userService.getProfile()
  }

  onSubmit(){
    this.submitted = true;
    const params = this.baseCtrl.getReadyBackendBody(this.userService.profileForm)
    if (params != false) {
      this.userService.updateProfile(params);
    }
  }

}
