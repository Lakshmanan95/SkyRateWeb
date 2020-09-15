import {Headers} from '@angular/http';
import {RequestOptions} from '@angular/http';
import {Injectable, Inject, ViewChild, ElementRef} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';
import {Injector} from '@angular/core';


import {ConfigService} from './../common/service/config/com.common.service.config.configmanager';
import {LoggingService} from './../common/service/logging/com.common.service.logging';
import {HttpUtil} from './../common/util/com.common.util.httputil';
import {SessionDataService} from '../common/service/com.common.sessiondata';
import {UserProfileService} from '../usermgmt/service/com.service.userprofile';
import {SessionStorageService} from '../common/service/com.common.sessionstorage';
import {BaseService} from '../common/basic/com.common.basic.baseservice';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams, Http} from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class MessageService extends BaseService {

  private GET_MESSAGE_LIST_URL = this._APIURL + '/message/getMessagesById';
  private ADD_MESSAGE_URL = this._APIURL + '/message/addMessage';
  private INBOX_BY_ID_URL = this._APIURL + '/message/getInboxById';
  private GET_CONVERSATION_BY_ID = this._APIURL + '/message/getByConversationId';
  private GET_READ_COUNT_URL = this._APIURL + '/message/getReadCount';
  private MAIL_TO_CLIENT = this._APIURL + '/message/mailToClient';
  private ADD_BANNER_URL = this._APIURL + '/advertisement/uploadBannerAd';
  private CLEAR_ALL_CHAT = this._APIURL + '/message/deleteMessageById';
  private DELETE_MESSAGE_URL = this._APIURL + '/message/deleteMessage';
  private READ_COUNT_URL = this._APIURL + '/message/getCount';
  public notificationCountSubject = new BehaviorSubject<any>(null);
  notificationCount$ = this.notificationCountSubject.asObservable();

  constructor(
    private _userProfileService: UserProfileService,
    injector: Injector) {

    super(injector);

  }

  addMessage(request: any) {
    return this._http.post(this.ADD_MESSAGE_URL, JSON.stringify(request), this._httpHeaderOptions)
      .toPromise()
      .then(res => res.json());
  }

  getMessagesById(request: any) {
    return this._http.post(this.GET_MESSAGE_LIST_URL, JSON.stringify(request), this._httpHeaderOptions)
      .toPromise()
      .then(res => res.json());
  }

  getInboxById(request: any) {
    return this._http.post(this.INBOX_BY_ID_URL, JSON.stringify(request), this._httpHeaderOptions)
      .toPromise()
      .then(res => res.json());
  }

  getConversationById(request: any) {
    return this._http.post(this.GET_CONVERSATION_BY_ID, JSON.stringify(request), this._httpHeaderOptions)
      .toPromise()
      .then(res => res.json());
  }

  getReadCount(request: any) {
    return this._http.post(this.GET_READ_COUNT_URL, JSON.stringify(request), this._httpHeaderOptions)
      .toPromise()
      .then(res => res.json());
  }

  mailToClient(request: any) {
    return this._http.post(this.MAIL_TO_CLIENT, JSON.stringify(request), this._httpHeaderOptions)
      .toPromise()
      .then(res => res.json());
  }

  addBanner(request: any) {
    return this._http.post(this.ADD_BANNER_URL, JSON.stringify(request), this._httpHeaderOptions)
      .toPromise()
      .then(res => res.json());
  }

  clearAllMessage(request: any) {
    return this._http.post(this.CLEAR_ALL_CHAT, JSON.stringify(request), this._httpHeaderOptions)
      .toPromise()
      .then(res => res.json());
  }

  deleteMessage(request: any) {
    return this._http.post(this.DELETE_MESSAGE_URL, JSON.stringify(request), this._httpHeaderOptions)
      .toPromise()
      .then(res => res.json());
  }

  /**
   * Notification Count
   * @param request
   * @returns {Subscription}
   */
  readCount(request: any) {
    //alert(1)
    return this._http.post(this.READ_COUNT_URL, JSON.stringify(request), this._httpHeaderOptions)
      .subscribe(res => {
        this.notificationCountSubject.next(res.json());
      });
  }
}
