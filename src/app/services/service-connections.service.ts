import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Enums} from '../models/enums/enums';
import {BaseMethodsService} from './base/base-methods.service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServiceConnectionsService {
  private headers: {} | undefined;

  constructor(private http: HttpClient, private baseMethodsSerive: BaseMethodsService) {
  }

  sendingParams = {};

  serviceConnection(methodUrl: string, params: any = null, methodType: string, runLoader = true, keepRequest = null) {
    // -- header
    let headers = new HttpHeaders();
    if (params != null) {
      this.sendingParams = params;
    }
    if (this.baseMethodsSerive.isBrowser) {
      if (this.baseMethodsSerive.getHandleStorageData('token') != null) {
        let token = this.baseMethodsSerive.getHandleStorageData('token') || "";
        headers = headers.set('Token', token);
      }
      let lang = this.baseMethodsSerive.pageLanguageCulturName; //this.baseMethodsSerive.getHandleStorageData('lang');
      if (lang != null) {
        headers = headers.set('lang', lang);
      }
      if (keepRequest == true) {
        this.baseMethodsSerive.setRequestToLocalStorage(params);
      }
    }
    let data: Observable<Object>;
    if (methodType === Enums.MethodType.POST) {
      if (runLoader) {
        this.baseMethodsSerive.calledEndPointSet = true;
      }
      data = this.http.post(methodUrl, params, {headers});
    } else if (methodType === Enums.MethodType.GET) {
      if (runLoader) {
        this.baseMethodsSerive.calledEndPointGet = true;
      }
      data = this.http.get(methodUrl, {headers});
    } else  {
      data = this.http.delete(methodUrl, {headers});
    }
    return data;
  }

  parseData(data: any) {
    this.baseMethodsSerive.calledEndPointSet = false;
    const data2 = JSON.parse(data.data);
    if (data2 != null && data2.Records == null) {
      data2.Records = [];
    }
    return data2;
  };

  parseDataToJsonDetails = function (data: any) {
    const response = data.Response;
    return response;
  };
  parseDataToJsonList = function (data: any) {
    const response = data?.Response?.Records;
    return response;
  };

  setEndPointResponse() {
    this.baseMethodsSerive.calledEndPointSet = false;
    this.baseMethodsSerive.savedSuccessFully = true;
  }

}
