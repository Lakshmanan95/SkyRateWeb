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
var forms_1 = require('@angular/forms');
var common_1 = require('@angular/common');
var core_2 = require('@angular/core');
var core_3 = require('@angular/core'); /*Import View Child*/
//----
var com_usermgmt_user_model_1 = require('../model/com.usermgmt.user.model');
var com_usermgmt_user_model_2 = require('../model/com.usermgmt.user.model');
var com_common_sessiondata_1 = require('../../common/service/com.common.sessiondata');
var com_service_usermgmt_1 = require('../service/com.service.usermgmt');
var com_common_model_address_1 = require('../../common/model/com.common.model.address');
var com_common_basic_basecomponent_1 = require('../../common/basic/com.common.basic.basecomponent');
var com_service_userprofile_1 = require('../../usermgmt/service/com.service.userprofile');
var com_common_service_alertservice_1 = require('../../common/service/alert/com.common.service.alertservice');
var UserProfile = (function (_super) {
    __extends(UserProfile, _super);
    function UserProfile(_router, injector, _userProfileService, _userMgmtService, fb) {
        _super.call(this, injector);
        this._router = _router;
        this._userProfileService = _userProfileService;
        this._userMgmtService = _userMgmtService;
        this.fb = fb;
        this.user = new com_usermgmt_user_model_1.User();
        this.changePasswordRequest = new com_usermgmt_user_model_2.ChangePasswordRequest();
        this.isFormValid = true;
        this.formValidationErrorMsg = "";
        this.loadUserProfile();
        if (!this.address) {
            //alert(this.shippingAddress)
            this.address = new com_common_model_address_1.Address();
        }
        this.profileForm = this.fb.group({
            _firstName: ['', forms_1.Validators.required],
            _lastName: ['', forms_1.Validators.required],
            _email: ['', forms_1.Validators.required],
            _phoneNumber: ['', forms_1.Validators.required]
        });
        this.changePasswordForm = this.fb.group({
            _oldPassword: ['', forms_1.Validators.required],
            _password: ['', forms_1.Validators.compose([
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(3)])],
            _confirmPassword: ['', forms_1.Validators.required]
        });
    }
    UserProfile.prototype.loadUserProfile = function () {
        this.user = this._userProfileService.getUserProfile();
        this.address = this._userProfileService.getUserProfileValue('address');
        if (!this.address) {
            com_common_service_alertservice_1.AlertService.getInstance().publishMessage('warning', 'User profile address required!');
        }
    };
    UserProfile.prototype.saveProfile = function () {
        var _this = this;
        this._userMgmtService.updateUserProfile(this.user).then(function (res) { return _this.cb_updateUserProfile(res); });
    };
    UserProfile.prototype.cb_updateUserProfile = function (res) {
        if (res.isSuccess) {
            this._userProfileService.setUserProfileValue("firstName", this.user.firstName);
            this._userProfileService.setUserProfileValue("lastName", this.user.lastName);
            this._userProfileService.setUserProfileValue("email", this.user.email);
            this._userProfileService.setUserProfileValue("phoneNumber", this.user.phoneNumber);
            com_common_service_alertservice_1.AlertService.getInstance().publishMessage('success', 'User profile updated successfully');
            alert('User profile updated successfully');
        }
        else {
            com_common_service_alertservice_1.AlertService.getInstance().publishMessage('danger', 'User profile not updated!');
        }
    };
    UserProfile.prototype.changePassword = function () {
        var _this = this;
        //alert(JSON.stringify(this.changePasswordForm));
        //  alert(JSON.stringify(this.changePasswordRequest))
        this.changePasswordRequest.userId = this._userProfileService.getUserId();
        this._userMgmtService.changePassword(this.changePasswordRequest).then(function (res) { return _this.cb_changePassword(res); });
    };
    UserProfile.prototype.cb_changePassword = function (res) {
        if (res.isSuccess) {
            com_common_service_alertservice_1.AlertService.getInstance().publishMessage('success', 'Password changed successfully');
            alert('Password changed successfully');
        }
        else {
            com_common_service_alertservice_1.AlertService.getInstance().publishMessage('danger', 'Error in password change..' + res.userErrorMsg);
        }
        //alert(JSON.stringify(res));
    };
    UserProfile.prototype.addNewAddress = function () {
        var _this = this;
        //  alert(this.shippingAddress);
        this.address.addressType = 1;
        this.address.userId = this._userProfileService.getUserId();
        this._loggingService.logDebug(this.getName(), JSON.stringify(this.address));
        this._userMgmtService.addNewAddress(this.address).then(function (res) { return _this.cb_addNewAddress(res); });
    };
    UserProfile.prototype.cb_addNewAddress = function (res) {
        if (res.isSuccess) {
            this.address.id = res.id;
            // this.profileAddress = this.shippingAddress;_userProfileService
            this._userProfileService.setUserProfileValue('address', this.address);
            com_common_service_alertservice_1.AlertService.getInstance().publishMessage('success', 'Address updated!:' + this.address.street + "..");
            //  alert(this.demo);
            this.demo.nativeElement.click();
        }
    };
    __decorate([
        core_3.ViewChild('addAddressButton'), 
        __metadata('design:type', core_3.ElementRef)
    ], UserProfile.prototype, "demo", void 0);
    UserProfile = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'profile',
            templateUrl: 'com.usermgmt.userprofile.html',
            providers: [com_common_sessiondata_1.SessionDataService, com_service_usermgmt_1.UserMgmtService, common_1.Location, { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }],
        }), 
        __metadata('design:paramtypes', [router_1.Router, core_2.Injector, com_service_userprofile_1.UserProfileService, com_service_usermgmt_1.UserMgmtService, forms_1.FormBuilder])
    ], UserProfile);
    return UserProfile;
}(com_common_basic_basecomponent_1.BaseComponent));
exports.UserProfile = UserProfile;
//# sourceMappingURL=com.usermgmt.userprofile.js.map