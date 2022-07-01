import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {BaseMethodsService} from "../../../services/base/base-methods.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-mdl-complaint-user',
  templateUrl: './mdl-complaint-user.component.html',
  styleUrls: ['./mdl-complaint-user.component.scss']
})
export class MdlComplaintUserComponent implements OnInit {

  constructor(public userService: UserService, public baseCtrl: BaseMethodsService, public bsModalRef: NgbModal) {
  }
  submitted = false
  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    this.userService.complaintUserForm.ToUserName.Value = this.userService.chosenInbox.ChatCreatedUserName;
    const params = this.baseCtrl.getReadyBackendBody(this.userService.complaintUserForm);
    console.log(JSON.stringify(this.userService.complaintUserForm))
    if (params != false) {
      this.userService.complaintUser(params);
    }
  }

  close() {
    this.bsModalRef.dismissAll();
  }

}
