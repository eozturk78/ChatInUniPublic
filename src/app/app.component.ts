import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {BaseMethodsService} from "./services/base/base-methods.service";
import {UserService} from "./services/user/user.service";
import {DOCUMENT, isPlatformBrowser, isPlatformServer} from "@angular/common";
import {BehaviorSubject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {io} from "socket.io-client";
import {Consts} from "./models/consts/consts";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ChatinUniPublicFE';


  constructor(@Inject(PLATFORM_ID) private platformId: any,
              @Inject(DOCUMENT) private doc: any, private baseCtrl: BaseMethodsService, private userService: UserService) {
    this.isHtmlBrowser = isPlatformBrowser(this.platformId);
    this.isServer = isPlatformServer(this.platformId);
    this.baseCtrl.isBrowser = this.isHtmlBrowser;
    AppComponent.isBrowser.next(isPlatformBrowser(platformId));
    const p = {
      Token: this.baseCtrl.getHandleStorageData("guestToken")
    };
    if (this.isHtmlBrowser) {
      this.userService.socket = io(Consts.protocol + Consts.apiPath);
      let language = window.location.pathname.substr(1, 2);
      if (language != "") this.baseCtrl.setLanguage(language)
      else this.baseCtrl.setLanguage(navigator.language);
      if (this.baseCtrl.getHandleStorageData('token') == null) this.userService.getPublicToken(p);
      else {
        let token = this.baseCtrl.getHandleStorageData('token') || "";
        this.userService.connectToSocket(token);
      }
    }
  }

  // @ts-ignore
  static isBrowser = new BehaviorSubject<boolean>(null);

  isHtmlBrowser = false;
  isServer: any;

  ngOnInit(): void {
  }

}
