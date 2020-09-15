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
var com_common_basic_formcomponent_1 = require('../../common/basic/com.common.basic.formcomponent');
var core_2 = require('@angular/core');
var com_common_service_alertservice_1 = require('../service/alert/com.common.service.alertservice');
var Alert = (function (_super) {
    __extends(Alert, _super);
    function Alert(injector) {
        var _this = this;
        _super.call(this, injector);
        this.alertMsg = '';
        this.alertType = 'info';
        this._loggingService.logDebug(this.getName(), "Alert component initiated");
        com_common_service_alertservice_1.AlertService.getInstance().myAlertMsg$.subscribe(function (message) {
            // alert(message);
            var alertMessage = message.split("~");
            _this.alertType = alertMessage[0];
            _this.alertMsg = alertMessage[1];
        });
    }
    Alert = __decorate([
        core_1.Component({
            selector: 'alert',
            templateUrl: 'app/com/common/alert/com.common.alert.html',
            providers: [com_common_service_alertservice_1.AlertService]
        }), 
        __metadata('design:paramtypes', [core_2.Injector])
    ], Alert);
    return Alert;
}(com_common_basic_formcomponent_1.FormComponent));
exports.Alert = Alert;
//# sourceMappingURL=com.common.alert.js.map