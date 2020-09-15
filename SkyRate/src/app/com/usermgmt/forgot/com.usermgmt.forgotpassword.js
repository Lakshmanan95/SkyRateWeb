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
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var com_common_sessiondata_1 = require('../../common/service/com.common.sessiondata');
var com_service_usermgmt_1 = require('../service/com.service.usermgmt');
var com_usermgmt_username_validator_1 = require('../signup/validators/com.usermgmt.username.validator');
var ForgotPassword = (function () {
    function ForgotPassword(_router, _userMgmtService, fb) {
        this._router = _router;
        this._userMgmtService = _userMgmtService;
        this.fb = fb;
        this.basicForm = this.fb.group({
            //  _username: ['',Validators.required]
            _username: ['', forms_1.Validators.compose([
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(3),
                    com_usermgmt_username_validator_1.UsernameValidators.cannotContainSpace])]
        });
    }
    ForgotPassword.prototype.onSubmit = function (f) {
        var _this = this;
        this._userMgmtService.forgotPassword({ "username": this.username }).then(function (res) { return _this.cb_forgotPassword(res); });
    };
    ForgotPassword.prototype.cb_forgotPassword = function (res) {
        if (res.isSuccess) {
            this.isSuccess = res.isSuccess;
        }
        else {
            this.isSuccess = false;
        }
    };
    ForgotPassword = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'forgot-password',
            templateUrl: 'com.usermgmt.forgotpassword.html',
            providers: [com_common_sessiondata_1.SessionDataService, com_service_usermgmt_1.UserMgmtService],
        }), 
        __metadata('design:paramtypes', [router_1.Router, com_service_usermgmt_1.UserMgmtService, forms_1.FormBuilder])
    ], ForgotPassword);
    return ForgotPassword;
}());
exports.ForgotPassword = ForgotPassword;
//# sourceMappingURL=com.usermgmt.forgotpassword.js.map