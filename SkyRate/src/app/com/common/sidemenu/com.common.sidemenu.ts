import {Component, ViewChild, ElementRef} from '@angular/core';
import {FormComponent} from '../../common/basic/com.common.basic.formcomponent';
import {Injector} from '@angular/core';
import {UserProfileService} from '../../usermgmt/service/com.service.userprofile';
import {RestApiService} from '../service/restapi/com.common.service.restapiservice';
import {PopoverModule} from 'ngx-popover';
import {SessionStorageService} from '../service/com.common.sessionstorage';
import {SessionDataService} from '../service/com.common.sessiondata';
import {CookieService} from 'ngx-cookie-service';
import {User} from '../../usermgmt/model/com.usermgmt.user.model';
import {UserMgmtService} from '../../usermgmt/service/com.service.usermgmt';
import {AuthValidatorProvider} from '../../common/service/com.service.authvalidator';
import {MessageService} from '../../service/com.service.message';


declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'side-menu',
  styleUrls: ['com.common.sidemenu.css'],
  templateUrl: 'com.common.sidemenu.html',
  providers: [RestApiService, SessionDataService, CookieService, UserMgmtService, AuthValidatorProvider]
})
export class SideMenu extends FormComponent {
  roleId: number = 4;
  userId: number = 0;
  tabId: number = 0;
  categories: any;
  userName: string = '';
  isUser: boolean = false;
  forgotRefresh: number = 0;
  user = new User();
  refresh: any;
  id: number;
  subCategories: any;
  profileImg: string = 'boy.png';
  count: number;
  notificationSubscription: any;


  constructor(injector: Injector, private _userProfileService: UserProfileService,
              private _cookieService: CookieService,
              private _messageService: MessageService,
              protected _sessionStorageService: SessionStorageService,
              protected _userMgmtService: UserMgmtService,
              public _authValidatorProvider: AuthValidatorProvider,
              cookieService: CookieService,
              private _restService: RestApiService) {

    super(injector);
  }

  sleep(milliseconds) {
    const start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  ngOnInit() {

    this.notificationSubscription = this._messageService.notificationCount$
      .subscribe(data => {
        this.count = data ? data.read : 0;
      });

    // TODO - Need not to use getCookie with angular 6 version
    const userInfo = this._sessionStorageService.getObject('userProfile');
    this.user = userInfo;
    if (this.user) {
      this.userName = this.user.userName;
      this.isUser = true;
    }
    this.profileImg = this._sessionStorageService.getObject('image');
    if (this.profileImg == null) {
      this.profileImg = 'boy.png';
    }
    SessionDataService.getInstance().updateSearch$.subscribe(value => {
      this.id = value;
      if (this.id !== 0) {
        this.roleId = this._sessionStorageService.getObject('roleId');
        this.isUser = true;
      }
    });

    SessionDataService.getInstance().forgotPass$.subscribe(value => {
      const valueOf = value;
      this.forgotRefresh = +valueOf;
      // if(this.forgotRefresh == 1){
      //   this._router.navigate(['']);
      // }
    });
    SessionDataService.getInstance().addCount$.subscribe(value => {
      var data = value;
      this.count = +data;
    });

    SessionDataService.getInstance().refresh$.subscribe(value => {
      this.refresh = value;
      this.profileImg = this._sessionStorageService.getObject('image');
      if (this.profileImg === null) {
        this.profileImg = 'assets/img/boy.png';
      }
      this.roleId = this._sessionStorageService.getObject('roleId');
      if (this.roleId === null) {
        this.roleId = 4;
      }
      if (value === '0') {
        this.logOut();
      }
    });

  }
/*
  getCount() {
    const request = {
      fromId: this.user.id
    };
    this._messageService.readCount(request);
  }

  cb_getCount(res) {
    this.count = res.read;
  }*/

  getSession() {
    this.roleId = this._sessionStorageService.getObject('roleId');
    this.user = this._sessionStorageService.getObject('userProfile');
    if (this.user == null) {
      if (this.roleId == null) {
        this.roleId = 4;
      }
    }
  }

  openLoginModal() {
    $('#loginModal').modal('toggle');
  }

  openLogin() {
    $('.signUpTab').hide();
    $('#signUp').removeClass('new-tab');
    $('#login').addClass('new-tab');
    $('.loginTab').show();
    this.tabId = 0;
  }

  openSignUp() {
    $('.loginTab').hide();
    $('#login').removeClass('new-tab');
    $('#signUp').addClass('new-tab');
    $('.signUpTab').show();
    this.tabId = 1;
  }

  getLogin() {
    if (this.tabId === 0) {
      const styles = {
        'color': '#D9B310',
        'border-bottom': '3px solid #D9B310'
      };
      return styles;
    }
  }

  loginResult(value) {
    $('#loginModal').modal('toggle');
    this.user = this._sessionStorageService.getObject('userProfile');
    // this._router.navigate(['search']);
    if (value === 'Success') {
      this.user = this._sessionStorageService.getObject('userProfile');
      // alert(this.user.firstName)
      this.userName = this._sessionStorageService.getObject('userName');
      this.isUser = true;
    }
    if (this.forgotRefresh === 1) {
      SessionDataService.getInstance().forgotPassword('' + 0);
      this._router.navigate(['']);
    }

  }

  registerResult(value) {

    // $(function () {
    $('#loginModal').modal('toggle');
    // this._router.navigate(['search']);
    // });
    if (value === 'Success') {
      this.userName = this._sessionStorageService.getObject('userName');
      this.user = this._sessionStorageService.getObject('userProfile');
      this.roleId = this._sessionStorageService.getObject('roleId');
      if (this.roleId == null)
        this.roleId = 4;
      this.isUser = true;
    }
    else {
      this.isUser = false;
      $(function () {
        $('#registerModal').modal('toggle');
      });
    }
  }

  profileUpdate() {
    this._router.navigate(['skyrate/profile-update']);
  }

  admin() {
    this._router.navigate(['admin/report']);
  }

  home() {
    this._router.navigate(['']);
  }


  inbox() {
    this._router.navigate(['business/message']);
  }

  claimBusiness() {
    this._router.navigate(['business/business-claimed']);
  }

  favorite() {
    this._router.navigate(['dashboard/popular-searches/'], {queryParams: {category: 'Favorite'}});
  }

  logOut() {
    this._sessionStorageService.clear();
    this._cookieService.deleteAll();
    SessionDataService.getInstance().refresh('' + '1');
    if (this.refresh != '0')
      this._router.navigate(['']);
    this.isUser = false;
    this.user = null;

    if (window.localStorage) {
      localStorage.removeItem('userState');
    }
    this._authValidatorProvider.deleteCookie('userState');
  }

  forgotPassword() {
    $('#loginModal').modal('toggle');
  }

  getQuery() {

  }
}
