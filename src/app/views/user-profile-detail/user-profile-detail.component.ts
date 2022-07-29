import { MdlProfilePhotoComponent } from './../modal/mdl-profile-photo/mdl-profile-photo.component';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {BaseMethodsService} from "../../services/base/base-methods.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-profile-detail',
  templateUrl: './user-profile-detail.component.html',
  styleUrls: ['./user-profile-detail.component.scss']
})
export class UserProfileDetailComponent implements OnInit {

  userName = null;

  constructor(private activatedRoute: ActivatedRoute, public userService: UserService, public baseCtrl: BaseMethodsService, public router: Router,
    private modalService: NgbModal) {
    this.userName = this.activatedRoute.snapshot.params['userName'];
  }

  message: string = "";

  ngOnInit(): void {
    const p = {
      UserName: this.userName
    }
    this.userService.getUserProfileDetail(p);
  }

  onSendMessage() {
      const p = {
        Message: this.message,
        ToUserName: this.userService.userProfileDetail.UserName.Value,
        Lang: this.baseCtrl.getHandleStorageData("lang"),
        Token: this.baseCtrl.getHandleStorageData("token")
      };

      if (this.baseCtrl.isBrowser) {
        this.userService.socket.emit("CreateChat", p);
        this.message = "";
        this.router.navigate(['/' + this.baseCtrl.pageLanguage + '/message-inbox'])
      }
  }
  onOpenProfilePhoto(photo: string) {
    this.userService.userPhoto = photo;
    this.modalService.open(MdlProfilePhotoComponent, {
      backdrop: 'static',
      size: 'md',
      keyboard: true
    });
  }
}
