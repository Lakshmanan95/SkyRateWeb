import {Component, EventEmitter, Output} from '@angular/core';
import {NgForm, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {Injector} from '@angular/core';
//-----
import {UserExt, User} from '../../model/com.usermgmt.user.model';
import {UserMgmtService} from '../../service/com.service.usermgmt';
import {SessionStorageService} from '../../../common/service/com.common.sessionstorage';
import {BaseComponent} from '../../../common/basic/com.common.basic.basecomponent';

import {CookieService} from 'ngx-cookie-service';
import {SessionDataService} from '../../../common/service/com.common.sessiondata';
import {AuthValidatorProvider} from '../../../common/service/com.service.authvalidator';
import {MessageService} from '../../../../com/service/com.service.message';
declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'com.usermgmt.newlogin.html',
  styleUrls: ['../styles/com.usermgmt.login.css'],
  providers: [UserMgmtService, SessionStorageService, SessionDataService, AuthValidatorProvider]

})
export class LoginComponent extends BaseComponent {
  loginFailed: boolean = false;
  emailMissing: boolean = false;
  userName: string = '';
  token: string;
  email: string;
  password: string;
  user = new User();
  remember: boolean = false;
  loginForm: FormGroup;
  cookieValue: string = 'UNKNOWN';

  @Output()
  loginSuccess = new EventEmitter();

  constructor(private _router: Router,
              private cookieService: CookieService,
              private _userMgmtService: UserMgmtService,
              private _authValidatorProvider: AuthValidatorProvider,
              private _messageService: MessageService,
              private fb: FormBuilder,
              injector: Injector) {
    super(injector);
    this.loginForm = this.fb.group({
      _userName: ['', Validators.required],
      _password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)])],
    });
    this.token = this._sessionStorageService.getObject('firstToken');
  }

  /**
   * On Submit
   */
  onSubmit() {
    this.token = this._sessionStorageService.getObject('firstToken');
    const request = {
      email: this.userName,
      password: this.password,
      rememberMe: this.remember,
      tokenEmail: this.token
    };
    this._userMgmtService.login(request).then(res => this.login(res));
  }

  /**
   * Login
   * @param res
   */
  login(res) {
    if (res.isSuccess) {
      this._authValidatorProvider.setUser(res);
      this._authValidatorProvider.setCookie('userState', res.userActive, 30, window.location.href);
      this._authValidatorProvider.setCookie('Refresh', res.userRefresh, 1, window.location.href);

      this.loginForm.reset();
      if (this.remember) {
        this.cookieService.set('AviationRating_UT', res.userActive);
      }
      this._sessionStorageService.setObject('userActivity', res.userActive);
      const cookies = this._sessionStorageService.getObject('userActivity');
      this.user = res.userProfile;
      this._sessionStorageService.setObject('userProfile', res.userProfile);

      this._sessionStorageService.setObject('roleId', res.roleId);
      this.getLoggedUser();
      this.loginSuccess.emit('Success');
      this.getCount();
      this._loggingService.logInfo(this.getName(), 'User Profile:' + JSON.stringify(this._sessionStorageService.getObject('userProfile')));
    } else {
      if (res.message == null) {
        this.loginFailed = true;
      } else {
        this.emailMissing = true;
      }
    }

  }

  /**
   * Input Focus
   */
  inputFocus() {
    this.loginFailed = false;
    this.emailMissing = false;
  }

  /**
   * Forgot Password
   */
  forgotPassword() {
    $('#loginModal').modal('toggle');
    this._router.navigate(['skyrate/forgot-password']);
  }

  /**
   * Map Refresh Response
   */
  mapRefreshResponse() {
    SessionDataService.getInstance().refresh('' + 1);
  }

  /**
   * Get Looged User
   */
  getLoggedUser() {
    const userProfileObj = this._sessionStorageService.getObject('userProfile');
    let userName;
    const image = this.user.profileImageUrl;
    this._sessionStorageService.setObject('image', image);
    if (userProfileObj) {
      userName = this.user.userName;
      const userId = this.user.id;

      this._sessionStorageService.setObject('userId', userId);
      this._sessionStorageService.setObject('userName', userName);
    }
    if (userName != null) {
      this.userName = userName;
    }
    this.mapRefreshResponse();
  }

  getCount() {
    const request = {
      fromId: this.user.id
    };
    this._messageService.readCount(request);
  }
}
