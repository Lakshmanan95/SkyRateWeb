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
var common_1 = require('@angular/common');
//----
var com_usermgmt_user_model_1 = require('../../model/com.usermgmt.user.model');
var com_usermgmt_username_validator_1 = require('../../signup/validators/com.usermgmt.username.validator');
var com_usermgmt_uniqueuser_validator_1 = require('../../signup/validators/com.usermgmt.uniqueuser.validator');
var com_common_sessiondata_1 = require('../../../common/service/com.common.sessiondata');
var com_service_usermgmt_1 = require('../../service/com.service.usermgmt');
var SignUpComponent = (function () {
    //myForm:FormGroup;
    function SignUpComponent(_router, 
        //location: Location,
        _userMgmtService, fb) {
        this._router = _router;
        this._userMgmtService = _userMgmtService;
        this.fb = fb;
        this.user = new com_usermgmt_user_model_1.User();
        this.isFormValid = true;
        this.formValidationErrorMsg = "";
        // _userMgmtService.checkUserExists("dd");
        // this.location = location;
        com_common_sessiondata_1.SessionDataService.getInstance().setMessage("this is a common message");
        this.signupForm = this.fb.group({
            _userName: ['', forms_1.Validators.compose([
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(3),
                    com_usermgmt_username_validator_1.UsernameValidators.cannotContainSpace]),
                com_usermgmt_uniqueuser_validator_1.UniqueUsernameValidators.shouldBeUnique(this._userMgmtService)],
            _firstName: ['', forms_1.Validators.required],
            _lastName: ['', forms_1.Validators.required],
            _email: ['', forms_1.Validators.required],
            _phoneNumber: ['', forms_1.Validators.required],
            _password: ['', forms_1.Validators.compose([
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(3)])],
            _confirmPassword: ['', forms_1.Validators.required]
        });
    }
    SignUpComponent.prototype.move2ConfirmationScreen = function () {
        var userData = JSON.stringify(this.user);
        com_common_sessiondata_1.SessionDataService.getInstance().setMessage(userData);
        this._router.navigate(['confirmsignup']);
    };
    SignUpComponent = __decorate([
        core_1.Component({
            selector: 'signup',
            templateUrl: 'app/com/usermgmt/signup/ui/com.usermgmt.signup.html',
            styleUrls: ['app/com/usermgmt/signup/styles/com.usermgmt.signup.css'],
            providers: [com_common_sessiondata_1.SessionDataService, com_service_usermgmt_1.UserMgmtService, common_1.Location, { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }],
        }), 
        __metadata('design:paramtypes', [router_1.Router, com_service_usermgmt_1.UserMgmtService, forms_1.FormBuilder])
    ], SignUpComponent);
    return SignUpComponent;
}());
exports.SignUpComponent = SignUpComponent;
//# sourceMappingURL=com.usermgmt.signup.js.map