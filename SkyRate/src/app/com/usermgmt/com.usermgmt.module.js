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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var com_usermgmt_signup_1 = require('./signup/ui/com.usermgmt.signup');
var com_usermgmt_signup_confirm_1 = require('./signup/ui/com.usermgmt.signup.confirm');
var com_usermgmt_signup_success_1 = require('./signup/ui/com.usermgmt.signup.success');
var com_usermgmt_signup_error_1 = require('./signup/ui/com.usermgmt.signup.error');
var com_usermgmt_equal_validator_directive_1 = require('./signup/validators/com.usermgmt.equal.validator.directive');
var com_usermgmt_forgotusername_1 = require('./forgot/com.usermgmt.forgotusername');
var com_usermgmt_forgotpassword_1 = require('./forgot/com.usermgmt.forgotpassword');
var com_common_module_1 = require('../common/com.common.module');
var com_usermgmt_userprofile_1 = require('../usermgmt/profile/com.usermgmt.userprofile');
var UserMgmtModule = (function () {
    function UserMgmtModule() {
    }
    UserMgmtModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, forms_1.ReactiveFormsModule, com_common_module_1.CommonModule],
            declarations: [com_usermgmt_signup_1.SignUpComponent, com_usermgmt_signup_confirm_1.ConfirmSignUpComponent, com_usermgmt_signup_success_1.SignUpSuccessComponent, com_usermgmt_signup_error_1.SignUpErrorComponent, com_usermgmt_userprofile_1.UserProfile, com_usermgmt_forgotusername_1.ForgotUsername, com_usermgmt_forgotpassword_1.ForgotPassword, com_usermgmt_equal_validator_directive_1.EqualValidator],
            exports: [com_usermgmt_signup_1.SignUpComponent, com_usermgmt_signup_confirm_1.ConfirmSignUpComponent, com_usermgmt_signup_success_1.SignUpSuccessComponent, com_usermgmt_signup_error_1.SignUpErrorComponent, com_usermgmt_forgotusername_1.ForgotUsername, com_usermgmt_forgotpassword_1.ForgotPassword, com_usermgmt_userprofile_1.UserProfile]
        }), 
        __metadata('design:paramtypes', [])
    ], UserMgmtModule);
    return UserMgmtModule;
}());
exports.UserMgmtModule = UserMgmtModule;
//# sourceMappingURL=com.usermgmt.module.js.map