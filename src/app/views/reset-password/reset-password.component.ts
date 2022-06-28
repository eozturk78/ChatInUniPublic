import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {BaseMethodsService} from "../../services/base/base-methods.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  submitted = false;
  email = null;
  token = null;

  constructor(
    private routeParams: ActivatedRoute, public userService: UserService, public baseCtrl: BaseMethodsService) {
  }

  ngOnInit(): void {
    this.token = this.routeParams.snapshot.params['token'];
    this.email = this.routeParams.snapshot.params['email'];
    this.userService.resetPasswordForm.Token.Value = this.token;
    this.userService.getLandingContent();
  }

  onSubmit() {
    this.submitted = true;
    const params = this.baseCtrl.getReadyBackendBody(this.userService.resetPasswordForm);
    if (params != false) {
      this.userService.resetPassoword(params);
    }
  }
}
