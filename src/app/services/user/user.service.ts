import { Injectable } from '@angular/core';
import {
  RequestModelsService,
  Status,
} from '../request-models/request-models.service';
import { Consts } from '../../models/consts/consts';
import { Enums } from '../../models/enums/enums';
import { ServiceConnectionsService } from '../service-connections.service';
import { ErrorManagementService } from '../error/error-management.service';
import { Router } from '@angular/router';
import { BaseMethodsService } from '../base/base-methods.service';
import { tap } from 'rxjs/operators';
import { Meta, Title } from '@angular/platform-browser';
import { io } from 'socket.io-client';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  socket: any;

  constructor(
    private requestModels: RequestModelsService,
    private serviceConnectionService: ServiceConnectionsService,
    private errorMessage: ErrorManagementService,
    private router: Router,
    private baseCtrl: BaseMethodsService,
    private pageTitle: Title,
    private metaTagService: Meta,
    public bsModalRef: NgbModal
  ) {}

  serviceBaseUrl = Consts.protocol + Consts.apiPath + Consts.userService;
  // -- SignUp
  signUpForm = this.requestModels.signUpRequest;
  // -- Login
  loginForm = this.requestModels.loginRequest;
  // -- ForgotPassword
  forgotPasswordForm = this.requestModels.forgotPasswordRequest;
  setForgotPasswordSuccess = false;
  // -- ResetPassword
  resetPasswordForm = this.requestModels.resetPasswordRequest;
  // -- profileForm
  profileForm = this.requestModels.updateProfileRequest;
  // -- status list
  statusObject = this.requestModels.statusListForm;
  // -- Blog list
  blogObject = this.requestModels.blogListForm;
  // -- Blog details
  blogDetailObject = this.requestModels.blogDetailForm;
  // -- activated users
  activeUsers = this.requestModels.activeUserListForm;
  // -- user profile user
  userProfileDetail = this.requestModels.userProfileDetailForm;
  // -- Complaint User
  complaintUserForm = this.requestModels.complaintUserRequest;
  // -- GoldUserRequest
  goldUserRequest = this.requestModels.phoneNumberRequest;
  isSuccessGoldRequest = false;

  // -- socket messages list
  inbox: Array<any> = [];
  statusList: Array<any> = [];
  chosenInbox: any;
  messageCount: number = 0;

  // -- SignUp EndPoint
  signUp(params: any) {
    const methodUrl = this.serviceBaseUrl + Consts.signUp;
    this.serviceConnectionService
      .serviceConnection(methodUrl, params, Enums.MethodType.POST)
      .subscribe(
        (resp: any) => {
          this.serviceConnectionService.setEndPointResponse();
        },
        (error: any) => {
          this.errorMessage.onShowErrorMessage(error);
        }
      );
  }

  // -- Login EndPoint
  login(params: any) {
    const methodUrl = this.serviceBaseUrl + Consts.login;
    this.serviceConnectionService
      .serviceConnection(methodUrl, params, Enums.MethodType.POST)
      .subscribe(
        (resp: any) => {
          const data =
            this.serviceConnectionService.parseDataToJsonDetails(resp);
          this.baseCtrl.setHandleStorageData('token', data.Token);
          this.baseCtrl.setHandleStorageData('email', data.Email);
          this.baseCtrl.setHandleStorageData('userName', data.UserName);
          this.socket.emit('UpdateSocketId', { Token: data.Token });
          window.location.href = '/';
        },
        (error: any) => {
          this.errorMessage.onShowErrorMessage(error);
        }
      );
  }

  // -- ForgotPassword EndPoint
  forgotPassword(params: any) {
    const methodUrl = this.serviceBaseUrl + Consts.forgotPassword;
    this.serviceConnectionService
      .serviceConnection(methodUrl, params, Enums.MethodType.POST)
      .subscribe(
        (resp: any) => {
          this.setForgotPasswordSuccess = true;
        },
        (error: any) => {
          this.setForgotPasswordSuccess = false;
          this.errorMessage.onShowErrorMessage(error);
        }
      );
  }

  // -- ResetPassword EndPoint
  resetPassoword(user: any) {
    const methodUrl = this.serviceBaseUrl + Consts.resetPassword;
    this.serviceConnectionService
      .serviceConnection(methodUrl, user, Enums.MethodType.POST)
      .subscribe(
        (resp: any) => {
          // @ts-ignore
          window.location = `${this.baseCtrl.pageLanguage}/login`;
        },
        (error: any) => {
          this.errorMessage.onShowErrorMessage(error);
        }
      );
  }

  // -- GetProfile EndPoint
  getProfile() {
    const methodUrl = this.serviceBaseUrl + Consts.getProfile;
    this.serviceConnectionService
      .serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(
        (resp: any) => {
          const data =
            this.serviceConnectionService.parseDataToJsonDetails(resp);
          this.baseCtrl.fillResponseToForm(this.profileForm, data);
          this.baseCtrl.fillResponseToForm(this.statusObject, data, true);
        },
        (error: any) => {
          this.errorMessage.onShowErrorMessage(error);
        }
      );
  }

  // -- UpdateProfile EndPoint
  updateProfile(params: any) {
    const methodUrl = this.serviceBaseUrl + Consts.updateProfile;
    this.serviceConnectionService
      .serviceConnection(methodUrl, params, Enums.MethodType.POST)
      .subscribe(
        (resp: any) => {
          const data =
            this.serviceConnectionService.parseDataToJsonDetails(resp);
          this.serviceConnectionService.setEndPointResponse();
        },
        (error: any) => {
          this.errorMessage.onShowErrorMessage(error);
        }
      );
  }

  // -- UploadProfilePhoto EndPoint
  uploadProfilePhoto(params: any) {
    const methodUrl = this.serviceBaseUrl + Consts.uploadProfilePhoto;
    this.serviceConnectionService
      .serviceConnection(methodUrl, params, Enums.MethodType.POST)
      .subscribe(
        (resp: any) => {
          const data =
            this.serviceConnectionService.parseDataToJsonDetails(resp);
          const imageForm = this.requestModels.fnProfilePhotosModel();
          this.baseCtrl.fillResponseToForm(imageForm, data);
          if (this.profileForm.ProfilePhotos.Value == null) {
            // @ts-ignore
            this.profileForm.ProfilePhotos.Value = [];
          }
          // @ts-ignore
          this.profileForm.ProfilePhotos.Value.push(imageForm);
        },
        (error: any) => {
          this.errorMessage.onShowErrorMessage(error);
        }
      );
  }

  // -- deleteProfilePhoto EndPoint
  deleteProfilePhoto(params: any) {
    const methodUrl =
      this.serviceBaseUrl + Consts.deleteProfilePhoto + '/' + params.FileId;
    this.serviceConnectionService
      .serviceConnection(methodUrl, params, Enums.MethodType.POST)
      .subscribe(
        (resp: any) => {
          const data =
            this.serviceConnectionService.parseDataToJsonDetails(resp);
        },
        (error: any) => {
          this.errorMessage.onShowErrorMessage(error);
        }
      );
  }

  // -- StatusList EndPoint
  getStatusList() {
    const methodUrl = this.serviceBaseUrl + Consts.getStatusList;
    this.serviceConnectionService
      .serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(
        (resp: any) => {
          const data =
            this.serviceConnectionService.parseDataToJsonDetails(resp);
          this.baseCtrl.fillResponseToForm(this.statusObject, data, true);
        },
        (error: any) => {
          this.errorMessage.onShowErrorMessage(error);
        }
      );
  }

  // -- ActiveUserList EndPoint
  getActiveUserList(params: any) {
    const methodUrl =
      this.serviceBaseUrl + Consts.getActiveUserList + '/' + params?.StatusId;
    this.activeUsers.Records.Value = null;
    this.serviceConnectionService
      .serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(
        (resp: any) => {
          const data =
            this.serviceConnectionService.parseDataToJsonDetails(resp);
          data.Records?.forEach((data: any) => {
            if(data.ProfilePhotos!=null) data.ProfilePhotos = JSON.parse(data.ProfilePhotos);
          });

          this.statusList = data.Statuses;
          this.baseCtrl.fillResponseToForm(this.activeUsers, data, true);
        },
        (error: any) => {
          this.errorMessage.onShowErrorMessage(error);
        }
      );
  }

  // -- GetUserProfileDetail EndPoint
  getUserProfileDetail(params: any) {
    const methodUrl =
      this.serviceBaseUrl + Consts.getUserProfileDetail + '/' + params.UserName;
    this.serviceConnectionService
      .serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(
        (resp: any) => {
          const data =
            this.serviceConnectionService.parseDataToJsonDetails(resp);
          this.baseCtrl.fillResponseToForm(this.userProfileDetail, data, false);
        },
        (error: any) => {
          this.errorMessage.onShowErrorMessage(error);
        }
      );
  }

  // -- GetPublicToken EndPoint
  getPublicToken(params: any) {
    const methodUrl = this.serviceBaseUrl + Consts.getPublicToken;
    this.serviceConnectionService
      .serviceConnection(methodUrl, params, Enums.MethodType.POST)
      .subscribe(
        (resp: any) => {
          const data =
            this.serviceConnectionService.parseDataToJsonDetails(resp);
          this.baseCtrl.setHandleStorageData('token', data.Token);
        },
        (error: any) => {
          this.errorMessage.onShowErrorMessage(error);
        }
      );
  }

  // -- GetMessageList EndPoint
  getMessageList() {
    const methodUrl = this.serviceBaseUrl + Consts.getMessageList;
    this.serviceConnectionService
      .serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(
        (resp: any) => {
          const data =
            this.serviceConnectionService.parseDataToJsonDetails(resp);
          this.inbox = data.Records;
          console.log(JSON.stringify(data.Records));
        },
        (error: any) => {
          this.errorMessage.onShowErrorMessage(error);
        }
      );
  }

  // -- deleteChat EndPoint
  deleteChat(params: any) {
    const methodUrl =
      this.serviceBaseUrl + Consts.deleteChat + '/' + params.ChatId;
    this.serviceConnectionService
      .serviceConnection(methodUrl, params, Enums.MethodType.POST)
      .subscribe(
        (resp: any) => {},
        (error: any) => {
          this.errorMessage.onShowErrorMessage(error);
        }
      );
  }

  // -- blockUserByUser EndPoint
  blockUserByUser(params: any) {
    const methodUrl = this.serviceBaseUrl + Consts.blockUserByUser;
    this.serviceConnectionService
      .serviceConnection(methodUrl, params, Enums.MethodType.POST)
      .subscribe(
        (resp: any) => {},
        (error: any) => {
          this.errorMessage.onShowErrorMessage(error);
        }
      );
  }

  // -- complaintUser EndPoint
  complaintUser(params: any) {
    const methodUrl = this.serviceBaseUrl + Consts.complaintUser;
    this.serviceConnectionService
      .serviceConnection(methodUrl, params, Enums.MethodType.POST)
      .subscribe(
        (resp: any) => {
          const params = {
            BlockedUserName: this.chosenInbox?.ChatCreatedUserName,
            ChatId: this.chosenInbox?.ChatId,
          };
          this.blockUserByUser(params);
          let index = this.inbox.findIndex((x) => x.ChatId == params.ChatId);
          this.inbox.splice(index, 1);
          this.bsModalRef.dismissAll();
        },
        (error: any) => {
          this.errorMessage.onShowErrorMessage(error);
        }
      );
  }
  // -- sendGoldRequest EndPoint
  sendGoldRequest(params: any) {
    const methodUrl = this.serviceBaseUrl + Consts.sendGoldRequest;
    this.serviceConnectionService
      .serviceConnection(methodUrl, params, Enums.MethodType.POST)
      .subscribe(
        (resp: any) => {
          this.goldUserRequest.PhoneNumber.Value = null;
          this.serviceConnectionService.setEndPointResponse();
        },
        (error: any) => {
          this.errorMessage.onShowErrorMessage(error);
        }
      );
  }

  // -- GetBlogList EndPoint
  getBlogList() {
    const methodUrl = this.serviceBaseUrl + Consts.getPublicBlogList;
    this.serviceConnectionService
      .serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(
        (resp: any) => {
          const data =
            this.serviceConnectionService.parseDataToJsonDetails(resp);
          this.baseCtrl.fillResponseToForm(this.blogObject, data, true);
        },
        (error: any) => {
          this.errorMessage.onShowErrorMessage(error);
        }
      );
  }

  // -- getBlogDetails EndPoint
  getBlogDetails(params: any) {
    const methodUrl =
      this.serviceBaseUrl + Consts.getPublicBlogDetails + '/' + params.Url;
    this.serviceConnectionService
      .serviceConnection(methodUrl, params, Enums.MethodType.GET)
      .subscribe(
        (resp: any) => {
          const data =
            this.serviceConnectionService.parseDataToJsonDetails(resp);
          this.baseCtrl.fillResponseToForm(this.blogDetailObject, data, false);
          this.pageTitle.setTitle(
            'ChatInUni! ' + this.blogDetailObject.Title.Value
          );
          this.blogDetailObject?.KeyWords?.Value?.forEach((keyWord: any) => {
            this.metaTagService.addTags([
              {
                name: keyWord?.Name.Value,
                content: keyWord?.Description.Value,
              },
            ]);
          });
        },
        (error: any) => {
          this.errorMessage.onShowErrorMessage(error);
        }
      );
  }

  // -- getLandingContent EndPoint
  getLandingContent() {
    const methodUrl = this.serviceBaseUrl + Consts.getLandingContent;
    this.serviceConnectionService
      .serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(
        (resp: any) => {
          const data =
            this.serviceConnectionService.parseDataToJsonDetails(resp);
          this.pageTitle.setTitle('ChatInUni! ' + data.Records[0].MetaTitle);
          // @ts-ignore
          this.metaTagService.addTags(
            // @ts-ignore
            [{ name: 'keywords', content: data.Records[0].MetaKeywords }]
          );
          // @ts-ignore
          this.metaTagService.addTags(
            // @ts-ignore
            [{ name: 'description', content: data.Records[0].MetaDescription }]
          );
        },
        (error: any) => {
          this.errorMessage.onShowErrorMessage(error);
        }
      );
  }

  // -- Connect to socket
  connectToSocket(token: string) {
    if (this.baseCtrl.isBrowser) {
      this.socket.on('connection', (data: any) => {});
      this.fnUpdateSocketId(token);
    }
    /**/
  }

  // -- Update User SocketId
  fnUpdateSocketId(token: string) {
    if (this.baseCtrl.isBrowser) {
      this.socket.emit('UpdateSocketId', { Token: token });
      this.socket.on('CreateChat', (data: any) => {
        this.messageCount++;
        const p = {
          ChatId: data.ChatId,
          ChatCreatedUserName: data.FromUserName,
          Date: data.Date,
          LastMessageDate: data,
          Messages: Array<any>(),
        };
        p.Messages.push(data);
        this.inbox.unshift(p);
        this.baseCtrl.playAudio();
      });
      this.socket.on('Message', (data: any) => {
        if (data.error == null && data.error == undefined) {
          let inb = this.inbox.find(
            (x: any) =>
              x.ChatCreatedUserName == data.FromUserName ||
              x.ChatCreatedUserName == data.ToUserName
          );
          inb.LastMessageDate = data.Date;
          this.inbox.sort((val1: any, val2: any) => {
            return (
              new Date(val2.LastMessageDate).getTime() -
              new Date(val1.LastMessageDate).getTime()
            );
          });
          inb?.Messages?.push(data);
          this.messageCount++;
          this.baseCtrl.playAudio();
        } else {
          console.log(data.error);
        }
      });
    }
  }
}
