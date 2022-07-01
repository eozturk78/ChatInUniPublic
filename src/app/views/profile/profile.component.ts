import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {BaseMethodsService} from "../../services/base/base-methods.service";
import {Consts} from "../../models/consts/consts";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  submitted = false;
  submittedGoldUser = false;

  fileName: string | undefined;

  constructor(public userService: UserService, public baseCtrl: BaseMethodsService) {
  }

  ngOnInit(): void {
    this.userService.getProfile()
    this.userService.getLandingContent();
  }

  onSubmit() {
    this.submitted = true;
    const params = this.baseCtrl.getReadyBackendBody(this.userService.profileForm)
    if (params != false) {
      this.userService.updateProfile(params);
    }
  }

  onOpenChoosePhotoDialog() {
    document.getElementById('uploadedPhoto')?.click();
  }

  deleteProfilePhoto(file: any) {
    const params = this.baseCtrl.getReadyBackendBody(file)
    if (params != false) {
      this.userService.deleteProfilePhoto(params);
    }
  }


  readThis(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        const file: File = fileList[i];
        this.fileName = file.name;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = this.fnSendToFile.bind(this);
      }
    }
  }

  fnSendToFile(e: any) {
    const reader = e.target;
    const base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    const params = {
      ImageBase64: base64result,
      FileName: this.fileName
    };
    this.userService.uploadProfilePhoto(params);
  }

  onLogout() {
    this.baseCtrl.deleteHandleStorageData('userName');
    this.baseCtrl.deleteHandleStorageData('token');
    this.baseCtrl.deleteHandleStorageData('email');
    window.location.href = '/';
  }

  onSendGoldRequest(){
    const params = this.baseCtrl.getReadyBackendBody(this.userService.goldUserRequest)
    if (params != false) {
      this.userService.sendGoldRequest(params);
    }

  }
}
