import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BaseMethodsService } from '../../services/base/base-methods.service';
import { UserService } from '../../services/user/user.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(
    public baseCtrl: BaseMethodsService,
    public userService: UserService,
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router
  ) {
    this.baseCtrl.isBrowser = isPlatformBrowser(this.platformId);
  }

  userName: string | null | undefined;

  ngOnInit(): void {
    this.userService.userName = this.baseCtrl.getHandleStorageData('userName')!;
  }

  onChangeLanguage(language: string) {
    if (this.baseCtrl.isBrowser) {
      let url = '';
      if (
        window.location.pathname.toString().split('/')[1] == 'en' ||
        window.location.pathname.toString().split('/')[1] == 'ua' ||
        window.location.pathname.toString().split('/')[1] == 'tr'
      ) {
        url = window.location.pathname.toString().substr(3);
      } else {
        url = window.location.pathname;
      }
      let finalUrl = '/' + language.toString().toLowerCase();
      if (url != '') {
        finalUrl = finalUrl + url;
      }
      window.location.href = finalUrl;
     // this.router.navigate([finalUrl]);
    }
  }

}
