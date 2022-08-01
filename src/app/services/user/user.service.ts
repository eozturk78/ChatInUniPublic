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
  // -- ChangePassword
  changePasswordForm = this.requestModels.changePasswordRequest;
  isSuccessGoldRequest = false;

  // -- socket messages list
  inbox: Array<any> = [];
  statusList: Array<any> = [];
  chosenInbox: any;
  messageCount: number = 0;
  userName: string | undefined;
  sendMessageUserName: string | undefined;

  userPhoto: any;
  userPhotoId?: string = '';

  // -- SignUp EndPoint
  signUp(params: any) {
    const methodUrl = this.serviceBaseUrl + Consts.signUp;
    this.serviceConnectionService
      .serviceConnection(methodUrl, params, Enums.MethodType.POST)
      .subscribe(
        (resp: any) => {
          if (resp.IsSuccess) {
            const data =
              this.serviceConnectionService.parseDataToJsonList(resp);
            if (data != null) {
              this.baseCtrl.setHandleStorageData('token', data[0].Token);
              this.baseCtrl.setHandleStorageData('email', data[0].Email);
              this.baseCtrl.setHandleStorageData('userName', data[0].UserName);
              this.userName = data[0].UserName;
              this.socket.emit('UpdateSocketId', {
                Token: data[0].Token,
              });
              this.router.navigate([`${this.baseCtrl.pageLanguage}/profile`]);
            }
          } else {
            this.errorMessage.onShowErrorMessage(resp);
          }
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
          if (resp.IsSuccess) {
            const data =
              this.serviceConnectionService.parseDataToJsonDetails(resp);

            this.baseCtrl.setHandleStorageData('token', data.Token);
            this.baseCtrl.setHandleStorageData('email', data.Email);
            this.baseCtrl.setHandleStorageData('userName', data.UserName);
            this.userName = data.UserName;
            this.socket.emit('UpdateSocketId', { Token: data.Token });
            this.router.navigate([
              `${this.baseCtrl.pageLanguage}/active-users`,
            ]);
          } else {
            this.errorMessage.onShowErrorMessage(resp);
          }
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
          if (resp.IsSuccess) {
            this.setForgotPasswordSuccess = true;
          } else {
            this.errorMessage.onShowErrorMessage(resp);
          }
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
          if (resp.IsSuccess) {
            // @ts-ignore
            window.location = `${this.baseCtrl.pageLanguage}/login`;
          } else {
            this.errorMessage.onShowErrorMessage(resp);
          }
        },
        (error: any) => {
          this.errorMessage.onShowErrorMessage(error);
        }
      );
  }

  // -- ChangePassword EndPoint
  changePassword(user: any) {
    const methodUrl = this.serviceBaseUrl + Consts.changePassword;
    this.serviceConnectionService
      .serviceConnection(methodUrl, user, Enums.MethodType.POST)
      .subscribe(
        (resp: any) => {
          if (resp.IsSuccess) {
            this.serviceConnectionService.setEndPointResponse();
          } else {
            this.errorMessage.onShowErrorMessage(resp);
          }
        },
        (error: any) => {
          this.errorMessage.onShowErrorMessage(error);
        }
      );
  }

  profileDetailProfileImage = null;
  // -- GetProfile EndPoint
  getProfile() {
    const methodUrl = this.serviceBaseUrl + Consts.getProfile;
    this.profileForm.ProfilePhotos.Value = null;
    this.profileDetailProfileImage = null;

    this.serviceConnectionService
      .serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(
        (resp: any) => {
          if (resp.IsSuccess) {
            const data =
              this.serviceConnectionService.parseDataToJsonDetails(resp);
            this.baseCtrl.fillResponseToForm(this.profileForm, data);
            this.baseCtrl.fillResponseToForm(this.statusObject, data, true);
            data.Records[0].ProfilePhotos!.forEach((data: any) => {
              if (data.MainPhoto == 1)
                this.profileDetailProfileImage = data.FileURL;
            });
            if (this.profileDetailProfileImage == null)
              this.profileDetailProfileImage =
                data.Records[0].ProfilePhotos![0]?.FileURL;
          } else {
            this.errorMessage.onShowErrorMessage(resp);
          }
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
          if (resp.IsSuccess) {
            const data =
              this.serviceConnectionService.parseDataToJsonDetails(resp);
            this.serviceConnectionService.setEndPointResponse();
          } else {
            this.errorMessage.onShowErrorMessage(resp);
          }
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
          if (resp.IsSuccess) {
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
            if (this.profileDetailProfileImage == null)
              this.profileDetailProfileImage = imageForm.FileURL.Value;
          } else {
            this.errorMessage.onShowErrorMessage(resp);
          }
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
          if (resp.IsSuccess) {
            const data =
              this.serviceConnectionService.parseDataToJsonDetails(resp);
            this.getProfile();
            this.bsModalRef.dismissAll();
          } else {
            this.errorMessage.onShowErrorMessage(resp);
          }
        },
        (error: any) => {
          this.errorMessage.onShowErrorMessage(error);
        }
      );
  }

  // -- setMainProfilePhoto EndPoint
  setMainProfilePhoto(params: any) {
    const methodUrl =
      this.serviceBaseUrl + Consts.setMainProfilePhoto + '/' + params.FileId;
    this.serviceConnectionService
      .serviceConnection(methodUrl, params, Enums.MethodType.POST)
      .subscribe(
        (resp: any) => {
          if (resp.IsSuccess) {
            const data =
              this.serviceConnectionService.parseDataToJsonDetails(resp);
            this.getProfile();
            this.bsModalRef.dismissAll();
          } else {
            this.errorMessage.onShowErrorMessage(resp);
          }
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
          if (resp.IsSuccess) {
            const data =
              this.serviceConnectionService.parseDataToJsonDetails(resp);
            this.baseCtrl.fillResponseToForm(this.statusObject, data, true);
          } else {
            this.errorMessage.onShowErrorMessage(resp);
          }
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
          if (resp.IsSuccess) {
            const data =
              this.serviceConnectionService.parseDataToJsonDetails(resp);
            data.Records?.forEach((data: any) => {
              if (data.ProfilePhotos != null)
                data.ProfilePhotos = JSON.parse(data.ProfilePhotos);
            });
            this.statusList = data.Statuses;
            this.baseCtrl.fillResponseToForm(this.activeUsers, data, true);
          } else {
            this.errorMessage.onShowErrorMessage(resp);
          }
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
    this.userProfileDetail.ProfilePhotos.Value = null;
    this.userPhotoId = '';
    this.profileDetailProfileImage = null;
    this.serviceConnectionService
      .serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(
        (resp: any) => {
          if (resp.IsSuccess) {
            const data =
              this.serviceConnectionService.parseDataToJsonDetails(resp);
            this.baseCtrl.fillResponseToForm(
              this.userProfileDetail,
              data,
              false
            );
            data.ProfilePhotos!.forEach((data: any) => {
              if (data.MainPhoto == 1)
                this.profileDetailProfileImage = data.FileURL;
            });
            if (this.profileDetailProfileImage == null)
              this.profileDetailProfileImage = data.ProfilePhotos![0]?.FileURL;
          } else {
            this.errorMessage.onShowErrorMessage(resp);
          }
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
          if (resp.IsSuccess) {
            const data =
              this.serviceConnectionService.parseDataToJsonDetails(resp);
            this.baseCtrl.setHandleStorageData('token', data.Token);
          } else {
            this.errorMessage.onShowErrorMessage(resp);
          }
        },
        (error: any) => {
          this.errorMessage.onShowErrorMessage(error);
        }
      );
  }

  // -- GetMessageList EndPoint
  getMessageList() {
    const methodUrl = this.serviceBaseUrl + Consts.getMessageList;
    this.chosenInbox = null;
    this.serviceConnectionService
      .serviceConnection(methodUrl, null, Enums.MethodType.GET)
      .subscribe(
        (resp: any) => {
          if (resp.IsSuccess) {
            const data =
              this.serviceConnectionService.parseDataToJsonDetails(resp);
            this.inbox = data.Records;
            if (this.inbox != null) {
              this.inbox.forEach((data) => {
                if (data.ChatCreatedUserName == this.sendMessageUserName)
                  this.chosenInbox = data;
              });
            }
            this.sendMessageUserName = undefined;
          } else {
            this.errorMessage.onShowErrorMessage(resp);
          }
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
        (resp: any) => {
          if (resp.IsSuccess) {
            let index = 0;
            this.inbox.forEach((c: any) => {
              if (c.ChatId == params.ChatId) this.inbox.splice(index, 1);
              index++;
            });
            this.chosenInbox = null;
          } else {
            this.errorMessage.onShowErrorMessage(resp);
          }
        },
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
        (resp: any) => {
          if (!resp.IsSuccess) {
            this.errorMessage.onShowErrorMessage(resp);
          }
        },
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
          if (resp.IsSuccess) {
            const params = {
              BlockedUserName: this.chosenInbox?.ChatCreatedUserName,
              ChatId: this.chosenInbox?.ChatId,
            };
            this.blockUserByUser(params);
            let index = this.inbox.findIndex((x) => x.ChatId == params.ChatId);
            this.inbox.splice(index, 1);
            this.bsModalRef.dismissAll();
          } else {
            this.errorMessage.onShowErrorMessage(resp);
          }
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
          if (resp.IsSuccess) {
            this.goldUserRequest.PhoneNumber.Value = null;
            this.serviceConnectionService.setEndPointResponse();
          } else {
            this.errorMessage.onShowErrorMessage(resp);
          }
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
          if (resp.IsSuccess) {
            const data =
              this.serviceConnectionService.parseDataToJsonDetails(resp);
            this.baseCtrl.fillResponseToForm(this.blogObject, data, true);
          } else {
            this.errorMessage.onShowErrorMessage(resp);
          }
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
          if (resp.IsSuccess) {
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
          } else {
            this.errorMessage.onShowErrorMessage(resp);
          }
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
          if (resp.IsSuccess) {
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
          } else {
            this.errorMessage.onShowErrorMessage(resp);
          }
        },
        (error: any) => {
          this.errorMessage.onShowErrorMessage(error);
        }
      );
  }

  // -- read un read message
  getMessageCount() {
    this.messageCount = 0;
    this.inbox.forEach((message: any) => {
      this.messageCount += message.UnReadMessageCount;
    });
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
        if (this.inbox == null) this.inbox = [];
        let inb = this.inbox?.find((x: any) => x.ChatId == data.ChatId);
        if (inb == null) {
          const p = {
            ChatId: data.ChatId,
            ChatCreatedUserName: data.FromUserName,
            Date: data.Date,
            LastMessageDate: data.Date,
            Messages: Array<any>(),
          };
          p.Messages.push(data);
          if (this.inbox == null) this.inbox = [];
          this.inbox.unshift(p);
        } else {
          inb.Messages.push(data);
          inb.LastMessageDate = data.Date;
          inb.UnReadMessageCount++;
        }
        this.inbox.sort((val1: any, val2: any) => {
          return (
            new Date(val2.LastMessageDate).getTime() -
            new Date(val1.LastMessageDate).getTime()
          );
        });
        this.baseCtrl.playAudio();
      });
      this.socket.on('Message', (data: any) => {
        if (data.error == null && data.error == undefined) {
          let inb = this.inbox?.find((x: any) => x.ChatId == data.ChatId);
          if (inb != null) {
            inb.Messages = data.Messages;
            inb.LastMessageDate = data.LastMessageDate;
            inb.UnReadMessageCount++;
          } else {
            this.inbox = [];
            this.inbox.push(data);
          }
          this.inbox.sort((val1: any, val2: any) => {
            return (
              new Date(val2.LastMessageDate).getTime() -
              new Date(val1.LastMessageDate).getTime()
            );
          });
          this.messageCount++;
          this.baseCtrl.playAudio();
        } else {
          console.log(data.error);
        }
      });
    }
  }
}
