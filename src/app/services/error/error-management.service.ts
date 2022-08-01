import {Injectable} from '@angular/core';
import {BaseMethodsService} from '../base/base-methods.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorManagementService {

  constructor(private baseCtrl: BaseMethodsService) {
    this.baseCtrl.calledEndPointSet = false;
  }

  public isExistError = false;
  public errorText = null;

  public onShowErrorMessage(error: any) {
    const status =error.ErrorMessage !=null ? error.ErrorMessage: error?.error;
    if (this.baseCtrl.isBrowser) alert(status);
  }

  public clearError() {
    this.isExistError = false;
  }
}
