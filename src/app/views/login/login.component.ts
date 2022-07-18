import { Component, OnInit} from '@angular/core';
import {BaseMethodsService} from "../../services/base/base-methods.service";
import {UserService} from "../../services/user/user.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MdlForgotPasswordComponent} from "../modal/mdl-forgot-password/mdl-forgot-password.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted = false;

  constructor(public baseCtrl: BaseMethodsService, public userService: UserService,
              private modalService: NgbModal) {
  }


  async ngOnInit() {
    this.userService.getStatusList();
  }

  onSubmit() {
    this.submitted = true;
    const params = this.baseCtrl.getReadyBackendBody(this.userService.loginForm)


    if (params != false) {
      this.userService.login(params);
    }
  }

  onOpenForgotPassword() {
    this.modalService.open(MdlForgotPasswordComponent, {
      backdrop: 'static',
      size: 'md',
      keyboard: true
    });
  }

}
