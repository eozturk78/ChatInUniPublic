import {Inject, Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {RequestModelsService} from "../request-models/request-models.service";
import {LocalstorageService} from "../local-storage-service/storage-service.service";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class BaseMethodsService {

  constructor(private translate: TranslateService, private requestModels: RequestModelsService,
              private localstorageService: LocalstorageService, @Inject(DOCUMENT) private document: Document) {
  }

  // -- Pagination
  pageNo = null;
  page = null;
  dataPerPage = 10;
  isBrowser = false;
  savedSuccessFully = false;
  calledEndPointSet = false;
  calledEndPointGet = false;
  pageLanguage = "ua";
  pageLanguageCulturName = "ua";

  // Change language all of the project
  changeLanguageOnPage(langShortname: string = "ua-UK") {
    this.translate.setDefaultLang(langShortname);
  }

  // -- Check required value
  checkField(field: any) {
    if (field.IsRequired && (field.Value == null || field.Value == '')) {
      return true;
    }
    return false;
  }

  // -- Set Data From Local Storage
  setHandleStorageData(key: any, value: any) {
    this.localstorageService.setItem(key, value);
  }

  // -- Get Data From Local Storage
  getHandleStorageData(key: any) {
    return this.localstorageService.getItem(key);
  }

  // -- Get Data From Local Storage
  deleteHandleStorageData(key: any) {
    return this.localstorageService.removeItem(key);
  }

  // -- Request Settings
  setRequestToLocalStorage(params: any) {
    if (params != null) {
      const p = {
        RequestParams: params,
        PageNo: this.pageNo,
        PageNumber: this.page,
        DataPerPage: this.dataPerPage
      };
      this.setHandleStorageData('requestParams', JSON.stringify(p));
    }
  }

  // -- Check the required field before send request.
  getReadyBackendBody(request: any) {
    let endPointRequest: any = {};
    for (const key in request) {
      if (endPointRequest != false) {
        if (request[key].IsSendRequest == true) {
          if (request[key].ArrayList == true) {
            if (request[key].Value != null && request[key].Value != '') {
              endPointRequest[key] = [];
              for (let r of request[key].Value) {
                const p = this.getReadyBackendBody(r);
                if (p != false) {
                  endPointRequest[key].push(p);
                } else {
                  endPointRequest = false;
                  break;
                }
              }
            }
          } else if (request[key].IsRequired == true && (request[key].Value == null || request[key] == '') && request[key] != 0) {
            endPointRequest = false;
          } else if (endPointRequest != false) {
            endPointRequest[key] = request[key].Value;
          }
        }
      }
    }
    return endPointRequest;
  }

  // -- Set Data From Response To Form
  fillResponseToForm(requestForm: any | {}, data: any | {}, isArray = false) {
    let response: any = {};
    if (data?.Records != null && data.Records.length > 0 && !isArray) {
      response = data.Records[0];
    } else {
      response = data;
    }
    for (const key in response) {
      if (requestForm[key] != null) {
        if (requestForm[key].IsDateField == true && response[key] != null) {
          const sendDate = new Date(response[key]);
          requestForm[key].Value = {
            year: sendDate.getFullYear(),
            month: sendDate.getMonth() + 1,
            day: sendDate.getDate()
          };
        } else if (requestForm[key].ArrayList == true) {
          if (requestForm[key].Value == null) {
            requestForm[key].Value = [];
          }
          if (response[key] != null) {
            response[key].forEach((rk: any) => {
              // @ts-ignore
              const params = this.requestModels[requestForm[key].ModelFunction]();
              if (params != null) {
                this.fillResponseToForm(params, rk);
                requestForm[key].Value.push(params);
              }
            });
          }
        } else {
          requestForm[key].Value = response[key];
        }
      }
    }
  }

  // -- Play audio
  playAudio() {
    const audio = new Audio();
    audio.src = '../../../assets/mp3/notification.mp3';
    audio.play();
  }

  setLanguage(language: string) {
    this.pageLanguage = language != "" && language != null ? language : "en";
    let urlLanguage = "";
    if (language == 'tr') {
      urlLanguage = 'tr-TR';
      this.pageLanguage = 'tr';
    } else if (language == 'ua' || language == "uk") {
      urlLanguage = 'uk-UA';
      this.pageLanguage = 'ua';
    } else {
      urlLanguage = 'en-US';
      this.pageLanguage = 'en';
    }
    this.document.documentElement.lang = language;
    this.setHandleStorageData("lang", urlLanguage);
    this.changeLanguageOnPage(urlLanguage);
    this.pageLanguageCulturName = urlLanguage;
    this.translate.use(urlLanguage);
  }

  getLanguage() {
    let urlLanguage = "";
    let language = this.getHandleStorageData("lang");
    if (language == 'en-US') urlLanguage = 'en';
    else if (language == 'tr-TR') urlLanguage = 'tr';
    else if (language == 'uk-UA' || language == null) urlLanguage = 'ua';
    return urlLanguage;
  }

  now() {
    const date = new Date();
    let second = date.getSeconds().toString().length == 1 ? `0${date.getSeconds()}` : date.getSeconds();
    let miliSecond = date.getMilliseconds().toString().length == 1 ? `0${date.getMilliseconds()}` : date.getMilliseconds();
    let minutes = date.getMinutes().toString().length == 1 ? `0${date.getMinutes()}` : date.getMinutes();
    let hours = date.getHours().toString().length == 1 ? `0${date.getHours()}` : date.getHours();
    let day = date.getDate().toString().length == 1 ? `0${date.getDate()}` : date.getDate();
    let month = date.getMonth().toString().length == 1 ? `00${date.getMonth() + 1}` : date.getMonth() + 1;
    month = date.getMonth().toString().length == 2 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    return `${date.getFullYear()}-0${month}-${day}T${hours}:${minutes}:${second}.${miliSecond}`
  }
}
