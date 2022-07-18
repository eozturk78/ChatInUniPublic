import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {BaseMethodsService} from "../../../services/base/base-methods.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-mdl-forgot-password',
  templateUrl: './mdl-forgot-password.component.html',
  styleUrls: ['./mdl-forgot-password.component.scss']
})
export class MdlForgotPasswordComponent implements OnInit {
  submitted = false;

  constructor(public userService: UserService, public baseCtrl: BaseMethodsService, public bsModalRef: NgbModal) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    const params = this.baseCtrl.getReadyBackendBody(this.userService.forgotPasswordForm)
    if (params != false) {
      this.userService.forgotPassword(params);
    }
  }

  close() {
    this.bsModalRef.dismissAll();
  }
}
