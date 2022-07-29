import { Component, OnInit } from '@angular/core';
import { BaseMethodsService } from 'src/app/services/base/base-methods.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-gold-member',
  templateUrl: './gold-member.component.html',
  styleUrls: ['./gold-member.component.scss']
})
export class GoldMemberComponent implements OnInit {
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
    const params = this.baseCtrl.getReadyBackendBody(this.userService.goldUserRequest)
    if (params != false) {
      this.userService.sendGoldRequest(params);
    }

  }

}
