import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {BaseMethodsService} from "../../../services/base/base-methods.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-mdl-profile-photo',
  templateUrl: './mdl-profile-photo.component.html',
  styleUrls: ['./mdl-profile-photo.component.scss']
})
export class MdlProfilePhotoComponent implements OnInit {
  submitted = false;

  constructor(public userService: UserService, public baseCtrl: BaseMethodsService, public bsModalRef: NgbModal) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
  }

  close() {
    this.bsModalRef.dismissAll();
  }

  deletePhoto(){
    const params ={
      FileId: this.userService.userPhotoId
    }
    this.userService.deleteProfilePhoto(params);
  }

  setMainPhoto(){

    const params ={
      FileId: this.userService.userPhotoId
    }
    this.userService.setMainProfilePhoto(params);
  }
}
