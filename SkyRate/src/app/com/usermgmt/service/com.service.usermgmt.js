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
require('rxjs/add/operator/toPromise');
require('rxjs/add/operator/map');
var com_common_basic_baseservice_1 = require('../../common/basic/com.common.basic.baseservice');
var core_2 = require('@angular/core');
var UserMgmtService = (function (_super) {
    __extends(UserMgmtService, _super);
    function UserMgmtService(injector) {
        _super.call(this, injector);
        this._loginURL = this._APIURL + "/usermgmt/login";
        this._registerUserURL = this._APIURL + "/usermgmt/registerUser";
        this.CHECK_USERNAME_EXISTS = this._APIURL + "/usermgmt/usernameExists";
        this.ADD_UPDATE_ADDRESS = this._APIURL + "/usermgmt/addUpdateAddress";
        this.UPDATE_USER_PROFILE = this._APIURL + "/usermgmt/updateUserProfile";
        this.CHANGE_PASSWORD_URL = this._APIURL + "/usermgmt/changePassword";
        this.FORGOT_USERNAME_URL = this._APIURL + "/usermgmt/forgotUsername";
        this.FORGOT_PASSWORD_URL = this._APIURL + "/usermgmt/forgotPassword";
    }
    UserMgmtService.prototype.login = function (loginRequest) {
        return this._http.post(this._loginURL, JSON.stringify(loginRequest), this._httpHeaderOptions)
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    UserMgmtService.prototype.registerUser = function (request) {
        return this._http.post(this._registerUserURL, JSON.stringify(request), this._httpHeaderOptions)
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    UserMgmtService.prototype.updateUserProfile = function (request) {
        return this._http.post(this.UPDATE_USER_PROFILE, JSON.stringify({ "user": request }), this._httpHeaderOptions)
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    UserMgmtService.prototype.changePassword = function (request) {
        return this._http.post(this.CHANGE_PASSWORD_URL, JSON.stringify(request), this._httpHeaderOptions)
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    UserMgmtService.prototype.forgotUsername = function (request) {
        return this._http.post(this.FORGOT_USERNAME_URL, JSON.stringify(request), this._httpHeaderOptions)
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    UserMgmtService.prototype.forgotPassword = function (request) {
        return this._http.post(this.FORGOT_PASSWORD_URL, JSON.stringify(request), this._httpHeaderOptions)
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    UserMgmtService.prototype.checkUserExists = function (userName) {
        return this._http.post(this.CHECK_USERNAME_EXISTS, { "userName": userName }, this._httpHeaderOptions)
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    UserMgmtService.prototype.addNewAddress = function (address) {
        return this._http.post(this.ADD_UPDATE_ADDRESS, { "address": address }, this._httpHeaderOptions)
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    UserMgmtService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_2.Injector])
    ], UserMgmtService);
    return UserMgmtService;
}(com_common_basic_baseservice_1.BaseService));
exports.UserMgmtService = UserMgmtService;
//# sourceMappingURL=com.service.usermgmt.js.map