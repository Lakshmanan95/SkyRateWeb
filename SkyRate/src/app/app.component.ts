import {Component, Output, EventEmitter, HostListener} from '@angular/core';
import {SessionStorageService} from './com/common/service/com.common.sessionstorage';
import {UserMgmtService} from './com/usermgmt/service/com.service.usermgmt';
import {User} from './com/usermgmt/model/com.usermgmt.user.model';
import {CookieService} from 'ngx-cookie-service';
import {SessionDataService} from './com/common/service/com.common.sessiondata';
import {MessageService} from './com/service/com.service.message';
import $ from 'jquery';
import {Router, NavigationEnd} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './myapp.template.html',
  styleUrls: ['./app.component.css'],
  providers: [SessionStorageService, UserMgmtService, SessionDataService]
})
export class AppComponent {
  title = 'app';
  userName: any = null;
  user = new User();
  id: string;
  @Output()
  loginSuccess = new EventEmitter();

  constructor(private router: Router,
              private cookieService: CookieService,
              private _session: SessionStorageService,
              private _messageService: MessageService) {
  }

  ngOnInit() {
    const userResponse = this._session.getObject('userProfile');
    this.applyUserResponse(userResponse);
    this.subscribeToRouterChange();

    const self = this;

    /*
    * Get Count after every 3 minutes
    *
    */
    setInterval(() => {
      //alert("userid-"+this.user.id);
      if (this.user && this.user.id) {
        this.getCount();
      }
    }, 60000);

  }

  subscribeToRouterChange() {
    this.router.events.subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationEnd && this.user && this.user.id) {
        this.getCount();
      }
    });
  }

  /**
   * Apply User Response
   * @param res
   */
  applyUserResponse(res) {
    if (res) {
      this.user = res;
      this.getLoggedUser();
      this.loginSuccess.emit('Success');
    }
  }

  getCount() {
    const request = {
      fromId: this.user.id
    };
    this._messageService.readCount(request);
  }

  /**
   * Get Logged User
   * @param roleId
   * @param userProfile
   */
  getLoggedUser() {
    if (this.user) {
      this.userName = this.user.userName || null;
      this._session.setObject('userId', this.user.id);
      this._session.setObject('userName', this.user.userName);
      this._session.setObject('firstName', this.user.firstName);
      this._session.setObject('lastName', this.user.lastName);
      this.mapUserResponse(this.user.id);
    }
  }

  /**
   * Map User Response
   * @param id
   */
  mapUserResponse(id) {
    this.id = id;
    SessionDataService.getInstance().updateSearch('' + this.id);
  }
}
