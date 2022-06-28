import {Component, ElementRef, OnInit} from '@angular/core';
import {BaseMethodsService} from "../../services/base/base-methods.service";
import {UserService} from "../../services/user/user.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  host: {
    '(document:click)': 'onClick($event)'
  },
  selector: 'app-main',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: 1
      })),
      state('closed', style({
        opacity: 0
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  chosenStatus: any = null;
  isOpen = false;
  statusId = null;

  constructor(public base: BaseMethodsService, public userService: UserService, private _eref: ElementRef) {
    base.changeLanguageOnPage();
  }

  ngOnInit(): void {
    this.onGetUserList();
    this.userService.getLandingContent();
  }

  onChooseStatus(status: any) {
    this.chosenStatus = status;
    this.statusId = this.chosenStatus.StatusId;
    this.onGetUserList();
    this.isOpen = false;
  }
  onOpenStatusBox() {
    this.isOpen = !this.isOpen;
  }

  onClick(event: any) {
    if (this.isOpen && !this._eref.nativeElement.contains(event.target)) // or some similar check
      this.onOpenStatusBox();
  }

  onShuffle() {
    this.onGetUserList();
  }

  onGetUserList() {
    const p = {
      StatusId: this.statusId
    }
    this.userService.getActiveUserList(p);
  }
}
