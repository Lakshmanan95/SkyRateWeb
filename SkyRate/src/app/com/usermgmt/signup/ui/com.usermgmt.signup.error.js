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
//----
var com_usermgmt_user_model_1 = require('../../model/com.usermgmt.user.model');
var com_common_sessiondata_1 = require('../../../common/service/com.common.sessiondata');
var SignUpErrorComponent = (function () {
    function SignUpErrorComponent(_router) {
        this._router = _router;
        this.user = new com_usermgmt_user_model_1.User();
        var userData = com_common_sessiondata_1.SessionDataService.getInstance().getMessage();
        if (userData)
            this.user = JSON.parse(String(userData));
    }
    SignUpErrorComponent.prototype.move2UserProfileScreen = function () {
        //this._userMgmtService.registerUser(this.user).then(res => this.handleLoginResult(res))
        alert(1);
    };
    SignUpErrorComponent = __decorate([
        core_1.Component({
            selector: 'signup-success',
            templateUrl: 'app/com/usermgmt/signup/ui/com.usermgmt.signup.error.html',
            styleUrls: ['app/com/usermgmt/signup/styles/com.usermgmt.signup.css'],
            providers: [com_common_sessiondata_1.SessionDataService]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], SignUpErrorComponent);
    return SignUpErrorComponent;
}());
exports.SignUpErrorComponent = SignUpErrorComponent;
//# sourceMappingURL=com.usermgmt.signup.error.js.map