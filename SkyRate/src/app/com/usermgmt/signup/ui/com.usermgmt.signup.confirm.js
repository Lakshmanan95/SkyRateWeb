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
//----
var com_service_usermgmt_1 = require('../../service/com.service.usermgmt');
var com_usermgmt_user_model_1 = require('../../model/com.usermgmt.user.model');
var com_common_sessiondata_1 = require('../../../common/service/com.common.sessiondata');
var ConfirmSignUpComponent = (function () {
    function ConfirmSignUpComponent(_router, _userMgmtService, fb) {
        this._router = _router;
        this._userMgmtService = _userMgmtService;
        this.fb = fb;
        this.user = new com_usermgmt_user_model_1.User();
        var userData = com_common_sessiondata_1.SessionDataService.getInstance().getMessage();
        if (userData)
            this.user = JSON.parse(String(userData));
    }
    ConfirmSignUpComponent.prototype.registerUser = function () {
        var _this = this;
        this._userMgmtService.registerUser(this.user).then(function (res) { return _this.handleLoginResult(res); });
    };
    ConfirmSignUpComponent.prototype.handleLoginResult = function (res) {
        if (res.isSuccess) {
            // this._router.navigate(['usermgmt.signup.success'])
            this._router.navigate(['usermgmt.signup.success']);
        }
        else {
            this._router.navigate(['usermgmt.signup.error']);
        }
    };
    ConfirmSignUpComponent = __decorate([
        core_1.Component({
            selector: 'confirm-signup',
            templateUrl: 'app/com/usermgmt/signup/ui/com.usermgmt.signup.confirm.html',
            styleUrls: ['app/com/usermgmt/signup/styles/com.usermgmt.signup.css'],
            providers: [com_service_usermgmt_1.UserMgmtService, com_common_sessiondata_1.SessionDataService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, com_service_usermgmt_1.UserMgmtService, forms_1.FormBuilder])
    ], ConfirmSignUpComponent);
    return ConfirmSignUpComponent;
}());
exports.ConfirmSignUpComponent = ConfirmSignUpComponent;
//# sourceMappingURL=com.usermgmt.signup.confirm.js.map