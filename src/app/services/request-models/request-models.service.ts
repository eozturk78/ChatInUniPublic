import {Injectable} from '@angular/core';
import {never} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class RequestModelsService {
  constructor() {
  }

  // -- Login Request
  loginRequest = {
    UserName: {Value: null, IsRequired: true, IsSendRequest: true},
    Password: {Value: null, IsRequired: true, IsSendRequest: true}
  };
  // -- SignUp Request
  signUpRequest = {
    Email: {Value: null, IsRequired: true, IsSendRequest: true},
    UserName: {Value: null, IsRequired: true, IsSendRequest: true},
    Password: {Value: null, IsRequired: true, IsSendRequest: true},
    StatusId: {Value: null, IsRequired: true, IsSendRequest: true}
  };

  // -- ForgotPassword Request
  forgotPasswordRequest = {
    UserName: {Value: null, IsRequired: true, IsSendRequest: true}
  };
  // -- ComplaintUser Request
  complaintUserRequest = {
    ToUserName: {Value: null, IsRequired: true, IsSendRequest: true},
    ReasonText: {Value: null, IsRequired: true, IsSendRequest: true}
  };
  // -- ResetPassword Request
  resetPasswordRequest = {
    Password: {Value: null, IsRequired: true, IsSendRequest: true},
    RepeatPassword: {Value: null, IsRequired: true, IsSendRequest: false},
    Token: {Value: null, IsRequired: true, IsSendRequest: true}
  };
  // -- ChangePassword Request
  changePasswordRequest = {
    OldPassword: {Value: null, IsRequired: true, IsSendRequest: true},
    NewPassword: {Value: null, IsRequired: true, IsSendRequest: true}
  };
  // -- ProfileForm Request
  updateProfileRequest = {
    Email: {Value: null, IsRequired: true, IsSendRequest: true},
    UserName: {Value: null, IsRequired: true, IsSendRequest: true},
    StatusId: {Value: null, IsRequired: true, IsSendRequest: true},
    StatusText: {Value: null, IsRequired: false, IsSendRequest: false},
    ProfilePhotos: {
      Value: null,
      IsRequired: false,
      IsSendRequest: false,
      ModelFunction: 'fnProfilePhotosModel',
      ArrayList: true
    }
  };
  // -- StatusList Form
  statusListForm = {
    Statuses: {
      Value: null,
      IsRequired: false,
      IsSendRequest: false,
      ModelFunction: 'fnStatusListModel',
      ArrayList: true
    }
  }
  // -- ActiveUserList Form
  activeUserListForm = {
    Records: {
      Value: null,
      IsRequired: false,
      IsSendRequest: false,
      ModelFunction: 'fnActiveUserListModel',
      ArrayList: true
    }
  }
  // -- MessageList Form
  messageListForm = {
    Message: {Value: null, IsRequired: false, IsSendRequest: false},
    Date: {Value: null, IsRequired: false, IsSendRequest: false},
    SocketId: {Value: null, IsRequired: false, IsSendRequest: false}
  }

  // -- ProfileDetailForm Request
  userProfileDetailForm = {
    Email: {Value: null, IsRequired: true, IsSendRequest: true},
    UserName: {Value: null, IsRequired: true, IsSendRequest: true},
    ProfilePhotos: {
      Value: null,
      IsRequired: false,
      IsSendRequest: false,
      ArrayList: true,
      ModelFunction: 'fnProfilePhotosModel'
    },
    StatusIcon: {Value: null, IsRequired: true, IsSendRequest: true},
    StatusText: {Value: null, IsRequired: true, IsSendRequest: true}
  };
  // -- BlogList Form
  blogListForm = {
    Records: {
      Value: null,
      IsRequired: false,
      IsSendRequest: false,
      ModelFunction: 'fnBlogListModel',
      ArrayList: true
    }
  };


  // -- BlogDetail Request
  blogDetailForm = {
    BlogId: {Value: null, IsRequired: true, IsSendRequest: true},
    Title: {Value: '', IsRequired: true, IsSendRequest: true},
    Body: {Value: null, IsRequired: true, IsSendRequest: true},
    Url: {Value: null, IsRequired: true, IsSendRequest: true},
    CreatedDate: {Value: null, IsRequired: true, IsSendRequest: true},
    KeyWords: {
      Value: [],
      IsRequired: false,
      IsSendRequest: false,
      ArrayList: true,
      ModelFunction: 'fnMetaTagsModel'
    }
  };
  // -- GoldUser Request
  phoneNumberRequest = {
    PhoneNumber: {Value: null, IsRequired: true, IsSendRequest: true}
  };

  fnStatusListModel() {
    const params = {
      StatusId: {Value: null, IsRequired: false, IsSendRequest: true},
      StatusName: {Value: null, IsRequired: false, IsSendRequest: false}
    };
    return params;
  }

  fnBlogListModel() {
    const params = {
      BlogId: {Value: null, IsRequired: false, IsSendRequest: true},
      Title: {Value: null, IsRequired: false, IsSendRequest: true},
      Body: {Value: null, IsRequired: false, IsSendRequest: true},
      Url: {Value: null, IsRequired: false, IsSendRequest: true},
      CreatedDate: {Value: null, IsRequired: false, IsSendRequest: true},
      ProfilePhotos: {
        Value: null,
        IsRequired: false,
        IsSendRequest: false,
        ArrayList: true,
        ModelFunction: 'fnMetaTagsModel'
      },
    };
    return params;
  }

  fnActiveUserListModel() {
    const params = {
      Email: {Value: null, IsRequired: false, IsSendRequest: true},
      UserName: {Value: null, IsRequired: false, IsSendRequest: false},
      StatusId: {Value: null, IsRequired: false, IsSendRequest: false},
      StatusIcon: {Value: null, IsRequired: false, IsSendRequest: false},
      ProfilePhotos: {
        Value: null,
        IsRequired: false,
        IsSendRequest: false,
        ArrayList: true,
        ModelFunction: 'fnProfilePhotosModel'
      },
    };
    return params;
  }

  fnProfilePhotosModel() {
    const params = {
      FileId: {Value: null, IsRequired: false, IsSendRequest: true},
      MainPhoto: {Value: null, IsRequired: false, IsSendRequest: false},
      FileURL: {Value: null, IsRequired: false, IsSendRequest: false}
    };
    return params;
  }

  fnMetaTagsModel() {
    const params = {
      Name: {Value: null, IsRequired: false, IsSendRequest: true},
      Description: {Value: null, IsRequired: false, IsSendRequest: false}
    };
    return params;
  }


}


export class Status {
  statusId: string | undefined;
  statusName: string | undefined;
  arrayList: Array<Status> = [];

  // -- Prepare data for array list
  setArrayModel(data: Array<any>) {
    data.forEach((data: any) => {
      const model = new Status();
      model.statusId = data.StatusId;
      model.statusName = data.StatusName;
      this.arrayList.push(model);
    })
    return this.arrayList;
  }

  // -- Prepare data for detail
  setSingleModel(data: any) {
    const model = new Status();
    model.statusId = data.StatusId;
    model.statusId = data.StatusName;
    return model;
  }

  // -- Prepare Request
  getSingleModel(data: Status) {
    let model: any = {};
    model.StatusId = data.statusId;
    model.StatusName = data.statusName;
    return model;
  }

  // -- Get array list from
  getArrayList() {
    return this.arrayList;
  }
}
