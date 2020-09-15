"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var core_2 = require('@angular/core');
//-----
var com_service_usermgmt_1 = require('../../service/com.service.usermgmt');
var com_common_sessionstorage_1 = require('../../../common/service/com.common.sessionstorage');
var com_common_basic_basecomponent_1 = require('../../../common/basic/com.common.basic.basecomponent');
var LoginComponent = (function (_super) {
    __extends(LoginComponent, _super);
    function LoginComponent(_router, _userMgmtService, injector) {
        _super.call(this, injector);
        this._router = _router;
        this._userMgmtService = _userMgmtService;
        this.loginFailed = false;
        this.userName = '';
        //this.getLoggedUser();
        console.log('ngConstructor()');
    }
    LoginComponent.prototype.onSubmit = function (f) {
        var _this = this;
        this._sessionStorageService.clear();
        this._userMgmtService.login(f.value).then(function (res) { return _this.cb_login(res); });
    };
    LoginComponent.prototype.cb_login = function (res) {
        if (res.isSuccess) {
            this._sessionStorageService.setObject("userProfile", res.userProfile);
            this._loggingService.logDebug(this.getName(), "User Profile:" + JSON.stringify(this._sessionStorageService.getObject("userProfile")));
            // alert(JSON.stringify(res.userProfile.address))
            if (res.userProfile.address) {
                this._router.navigate(['dashboard']);
            }
            else {
                this._router.navigate(['dashboard/user-profile']);
            }
        }
        else {
            this._router.navigate(['']);
            this.loginFailed = true;
        }
    };
    LoginComponent.prototype.inputFocus = function () {
        this.loginFailed = false;
    };
    LoginComponent.prototype.getLoggedUser = function () {
        var userProfileObj = this._sessionStorageService.getObject("userProfile");
        var userName;
        if (userProfileObj) {
            userName = userProfileObj["firstName"];
        }
        if (userName != null) {
            this.userName = userName;
        }
    };
    LoginComponent.prototype.ngOnInit = function () {
        // Properties are resolved and things like
        // this.mapWindow and this.mapControls
        // had a chance to resolve from the
        // two child components <map-window> and <map-controls>
        console.log('ngOnInit()');
    };
    LoginComponent.prototype.ngOnDestroy = function () {
        // Speak now or forever hold your peace
        console.log('ngOnDestroy()');
    };
    LoginComponent.prototype.ngDoCheck = function () {
        // Custom change detection
        console.log('ngDoCheck()');
    };
    LoginComponent.prototype.ngOnChanges = function (changes) {
        // Called right after our bindings have been checked but only
        // if one of our bindings has changed.
        //
        // changes is an object of the format:
        // {
        //   'prop': PropertyUpdate
        // }
        console.log('ngOnChanges()');
    };
    LoginComponent.prototype.ngAfterContentInit = function () {
        // Component content has been initialized
        console.log('ngAfterContentInit()');
    };
    LoginComponent.prototype.ngAfterContentChecked = function () {
        // Component content has been Checked
        console.log('ngAfterContentChecked()');
        this.getLoggedUser();
    };
    LoginComponent.prototype.ngAfterViewInit = function () {
        // Component views are initialized
        console.log('ngAfterViewInit()');
    };
    LoginComponent.prototype.ngAfterViewChecked = function () {
        // Component views have been checked
        console.log('ngAfterViewChecked()');
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'app/com/usermgmt/login/ui/com.usermgmt.login.html',
            styleUrls: ['app/com/usermgmt/login/styles/com.usermgmt.login.css'],
            providers: [com_service_usermgmt_1.UserMgmtService, com_common_sessionstorage_1.SessionStorageService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, (typeof (_a = typeof com_service_usermgmt_1.UserMgmtService !== 'undefined' && com_service_usermgmt_1.UserMgmtService) === 'function' && _a) || Object, core_2.Injector])
    ], LoginComponent);
    return LoginComponent;
    var _a;
}(com_common_basic_basecomponent_1.BaseComponent));
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=com.usermgmt.login.js.map