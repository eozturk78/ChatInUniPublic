import { AppComponent } from './../../app.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { BaseMethodsService } from '../../services/base/base-methods.service';
import {
  state,
  style,
  trigger,
  transition,
  animate,
} from '@angular/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MdlComplaintUserComponent } from '../modal/mdl-complaint-user/mdl-complaint-user.component';

@Component({
  selector: 'app-message-inbox',
  templateUrl: './message-inbox.component.html',
  styleUrls: ['./message-inbox.component.scss'],
  animations: [
    trigger('slideLeftToRight', [
      state(
        'left',
        style({
          transform: 'translateX(-105%)',
        })
      ),
      state(
        'right',
        style({
          transform: 'translateX(0%)',
        })
      ),
      transition('left => right', [animate('0.2s')]),
      transition('right => left', [animate('0.2s')]),
    ]),
  ],
})
export class MessageInboxComponent implements OnInit {
  message = null;
  searchChat!: string;
  open = false;
  isMobile: boolean = false;
  someExpression: boolean = false;
  @ViewChild('chatSender') chatSender: any;
  @ViewChild('chatMessageContainer') chatMessageContainer: any;

  constructor(
    public userService: UserService,
    private baseCtrl: BaseMethodsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    if (this.userService.sendMessageUserName != null) this.open = true;
    if (this.baseCtrl.isBrowser && window.innerWidth < 769)
      this.isMobile = true;
    this.userService.getMessageList();
    this.userService.getLandingContent();
  }

  onSendMessage() {
    if (this.message != null && this.message != '') {
      const p = {
        ChatId: this.userService.chosenInbox.ChatId,
        Message: this.message,
        ToUserName: this.userService.chosenInbox.ChatCreatedUserName,
        Lang: this.baseCtrl.getHandleStorageData('lang'),
        Token: this.baseCtrl.getHandleStorageData('token'),
        IsFromLoggedUser: true,
      };
      if (this.baseCtrl.isBrowser) this.userService.socket.emit('Message', p);
      if (this.userService.chosenInbox.Messages == null)
        this.userService.chosenInbox.Messages = [];
      this.userService.chosenInbox.Messages.push(p);
      this.userService.chosenInbox.LastMessageDate = this.baseCtrl.now();

      this.userService.inbox.sort(function (o1, o2) {
        return o2.LastMessageDate ? -1 : o1.LastMessageDate ? 1 : 0;
      });
      this.userService.inbox.sort((val1, val2) => {
        // @ts-ignore
        return new Date(val2.LastMessageDate) - new Date(val1.LastMessageDate);
      });
      this.message = null;
      this.gotoEndOfToScreen();
    }
  }
  fnGetChatList() {
    var list =
      this.searchChat != null
        ? this.userService.inbox.filter(
            (x) =>
              x.ChatCreatedUserName.toString()
                .toLowerCase()
                .indexOf(this.searchChat?.toLowerCase()) > -1
          )
        : this.userService.inbox;
    return list;
  }

  onChooseUser(ib: any) {
    this.open = !this.open;
    this.userService.chosenInbox = ib;
    if (this.userService.chosenInbox.UnReadMessageCount > 0) {
      this.userService.socket.emit('ReadChatMessage', {
        ChatId: ib.ChatId,
        ChatCreatedUserName: this.userService.chosenInbox.ChatCreatedUserName,
      });
      this.userService.chosenInbox.UnReadMessageCount = 0;
      this.userService.getMessageCount();

      this.gotoEndOfToScreen();
    }
  }

  gotoEndOfToScreen() {
    var objDiv = document.getElementById('chatBox');
    if (objDiv != null) {
      objDiv.scrollTop = objDiv?.scrollHeight;
    }
    if (
      this.userService.chosenInbox != null &&
      this.userService.chosenInbox.UnReadMessageCount > 0
    ) {
      this.userService.chosenInbox.UnReadMessageCount = 0;
      this.userService.socket.emit('ReadChatMessage', {
        ChatId: this.userService.chosenInbox?.ChatId,
        ChatCreatedUserName: this.userService.chosenInbox.ChatCreatedUserName,
      });
      this.userService.getMessageCount();
    }
  }

  onDeleteChat() {
    const params = {
      ChatId: this.userService.chosenInbox?.ChatId,
    };
    this.userService.deleteChat(params);
    this.onTurnToMessageList();
  }

  onBlockUser() {
    if (this.baseCtrl.isBrowser) {
      const params = {
        BlockedUserName: this.userService.chosenInbox?.ChatCreatedUserName,
        ChatId: this.userService.chosenInbox?.ChatId,
      };
      this.userService.blockUserByUser(params);
      let index = this.userService.inbox.findIndex(
        (x) => x.ChatId == params.ChatId
      );
      this.userService.inbox.splice(index, 1);
      this.userService.chosenInbox = null;
      this.onTurnToMessageList();
    }
  }

  onComplaintUser() {
    this.modalService.open(MdlComplaintUserComponent, {
      backdrop: 'static',
      size: 'md',
      keyboard: true,
    });
  }

  onGotoProfile() {
    if (AppComponent.isBrowser)
      window.location.href = `${this.baseCtrl.pageLanguage}/user-profile-detail/${this.userService.chosenInbox.ChatCreatedUserName}`;
  }

  onTurnToMessageList() {
    this.open = !this.open;
  }

  animationDone() {
    if (!this.open) this.userService.chosenInbox = null;
  }
}
