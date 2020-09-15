import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {tap, catchError} from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';
import {User} from '../../usermgmt/model/com.usermgmt.user.model';
import {SessionStorageService} from '../../common/service/com.common.sessionstorage';
import {SessionDataService} from './com.common.sessiondata';

@Injectable()
export class AuthValidatorProvider {

  public userResponse: any = null;
  public userActiveSession: any = {value: null};
  public id: any;

  constructor(private http: HttpClient, private sessionStorageService: SessionStorageService) {

  }

  /**
   * App Auth Initializer
   * @returns {Promise<any>}
   */
  appAuthInitializer(apiURi): Promise<any> {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };
      this.userActiveSession.value = this.getActiveSession();
      if (this.userActiveSession.value) {
        this.http
          .post(`${apiURi}/usermgmt/getUserActive`, JSON.stringify(this.userActiveSession), httpOptions)
          .toPromise()
          .then(response => {
            if (response['isSuccess']) {
              this.sessionStorageService.setObject('userActivity', this.userActiveSession.value);
              this.sessionStorageService.setObject('userProfile', response['userProfile']);
              this.sessionStorageService.setObject('roleId', response['roleId']);
              this.sessionStorageService.setObject('userId', response['userProfile'].id);
              this.sessionStorageService.setObject('userName', response['userProfile'].userName);
              this.sessionStorageService.setObject('firstName', response['userProfile'].firstName);
              this.sessionStorageService.setObject('lastName', response['userProfile'].lastName);
              this.mapUserResponse(response['userProfile'].userid);
            } else {
              this.clearLogin();
            }
            resolve(true);
          })
          .catch(this.handleError);
      } else {
        resolve(true);
      }
    });
  }

  /**
   * Get Active Session
   * @returns {any}
   */
  getActiveSession() {
    const userState = this.getCookie('userState');
    if (userState) {
      return userState;
    }
    return null;
  }

  /**
   * Get User Role
   * @returns {any}
   */
  getUserRole() {
    const userState = this.sessionStorageService.getObject('userProfile');
    if (userState) {
      return userState.roleId;
    }
    return null;
  }

  /**
   * Get User Profile
   * @returns {any}
   */
  getUserProfile() {
    const userState = this.sessionStorageService.getObject('userProfile');
    if (userState) {
      return userState.userProfile;
    }
    return null;
  }

  /**
   * Get User
   * @returns {User}
   */
  getUser() {
    return this.userResponse;
  }

  /**
   * Set User
   * @param userResponse
   */
  setUser(userResponse) {
    this.userResponse = userResponse;
  }

  /**
   * Get Cookie
   * @param {string} name
   * @returns {string}
   */
  getCookie(name: string) {
    const ca: Array<string> = document.cookie.split(';');
    const caLen: number = ca.length;
    const cookieName = `${name}=`;
    let c: string;

    for (let i = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) === 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    try {
      return localStorage.getItem(name);
    } catch (e) {
      return '';
    }
  }

  /**
   * Set Cookie
   * @param {string} name
   * @param {string} value
   * @param {number} expireDays
   * @param {string} path
   */
  setCookie(name: string, value: string, expireDays: number, path: string = '') {
    try {
      if (window.localStorage) {
        localStorage.setItem(name, value);
      }
      const d: Date = new Date();
      d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
      const expires = `expires=${d.toUTCString()}`;
      const cPath = path ? `; path=${path}` : '';
      document.cookie = `${name}=${value}; ${expires}${cPath}`;
    } catch (e) {
      return;
    }
  }

  /**
   * Delete Cookie
   * @param name
   */
  deleteCookie(name: string) {
    document.cookie = name + '=; Max-Age=-99999999;';
  }

  /**
   * Map User Response
   * @param id
   */
  mapUserResponse(id) {
    this.id = id;
    SessionDataService.getInstance().updateSearch('' + this.id);
  }

  clearLogin() {
    if (window.localStorage) {
      localStorage.removeItem('userState');
    }
    this.deleteCookie('userState');
  }

  /**
   * Handle All errors
   * @param data
   * @returns {(error: any) => void}
   */
  private handleError(data?: any) {
    return (error: any) => {
      console.log('Navigate to login page!');
    };
  }
}
