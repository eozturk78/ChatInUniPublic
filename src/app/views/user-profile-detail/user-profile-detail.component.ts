import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {BaseMethodsService} from "../../services/base/base-methods.service";

@Component({
  selector: 'app-user-profile-detail',
  templateUrl: './user-profile-detail.component.html',
  styleUrls: ['./user-profile-detail.component.scss']
})
export class UserProfileDetailComponent implements OnInit {

  userName = null;

  constructor(private activatedRoute: ActivatedRoute, public userService: UserService, public baseCtrl: BaseMethodsService, public router: Router) {
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
    if (this.message?.length > 0) {
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
  }
}
