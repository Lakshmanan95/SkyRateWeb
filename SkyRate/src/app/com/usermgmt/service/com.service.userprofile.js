"use strict";
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
var com_common_sessionstorage_1 = require('../../common/service/com.common.sessionstorage');
var UserProfileService = (function () {
    function UserProfileService(_sessionStorageService) {
        this._sessionStorageService = _sessionStorageService;
    }
    UserProfileService.prototype.getUserId = function () {
        var userProfileObj = this.getUserProfile();
        var userId;
        if (userProfileObj) {
            userId = userProfileObj["id"];
        }
        if (userId != null) {
            return userId;
        }
        else {
            return "";
        }
    };
    UserProfileService.prototype.getAddress = function () {
        var userProfileObj = this.getUserProfile();
        var address;
        if (userProfileObj) {
            address = userProfileObj["address"];
        }
        if (address != null) {
            return address;
        }
        else {
            return "";
        }
    };
    UserProfileService.prototype.getUserProfile = function () {
        return this._sessionStorageService.getObject("userProfile");
    };
    UserProfileService.prototype.getUserProfileValue = function (key) {
        return this._sessionStorageService.getObject("userProfile")[key];
    };
    UserProfileService.prototype.setUserProfileValue = function (key, value) {
        var userProfile = this._sessionStorageService.getObject("userProfile");
        userProfile[key] = value;
        this._sessionStorageService.setObject("userProfile", userProfile);
    };
    UserProfileService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [com_common_sessionstorage_1.SessionStorageService])
    ], UserProfileService);
    return UserProfileService;
}());
exports.UserProfileService = UserProfileService;
//# sourceMappingURL=com.service.userprofile.js.map