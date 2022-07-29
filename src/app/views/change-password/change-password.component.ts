import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseMethodsService } from 'src/app/services/base/base-methods.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  submitted = false;
  constructor(
    public userService: UserService,
    public baseCtrl: BaseMethodsService
  ) {}

  ngOnInit(): void {
    this.userService.getProfile();
  }
  onSubmit(){
    this.submitted = true;
    const params = this.baseCtrl.getReadyBackendBody(this.userService.changePasswordForm)
    if (params != false) {
      this.userService.changePassword(params);
    }
  }

}
