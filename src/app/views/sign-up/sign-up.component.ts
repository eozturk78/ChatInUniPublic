import { Router } from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {BaseMethodsService} from "../../services/base/base-methods.service";
import {UserService} from "../../services/user/user.service";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
    submitted = false;

    constructor(public baseCtrl: BaseMethodsService, public userService: UserService, private router: Router) {
        baseCtrl.changeLanguageOnPage();
    }

    ngOnInit(): void {
      this.userService.getStatusList();
      this.userService.getLandingContent();
    }

    onSubmit() {
        this.submitted = true;
        const params = this.baseCtrl.getReadyBackendBody(this.userService.signUpForm)
        if (params != false) {
            this.userService.signUp(params);
        }
    }

    onGotoPrivacyPolicy(){
      this.router.navigate(['/'+this.baseCtrl.pageLanguage +'/privacy-policy'])
    }
}
