"use strict";
var Subject_1 = require('rxjs/Subject');
var AlertService = (function () {
    function AlertService() {
        this.myAlert = new Subject_1.Subject();
        this.myAlertMsg$ = this.myAlert.asObservable();
        if (!AlertService.isCreating) {
            throw new Error("You can't call new in Singleton instances!");
        }
    }
    AlertService.getInstance = function () {
        if (AlertService.instance == null) {
            AlertService.isCreating = true;
            AlertService.instance = new AlertService();
            AlertService.isCreating = false;
        }
        return AlertService.instance;
    };
    AlertService.prototype.publishMessage = function (alertType, newMessage) {
        this.myAlert.next(alertType + "~" + newMessage);
    };
    AlertService.isCreating = false;
    return AlertService;
}());
exports.AlertService = AlertService;
//# sourceMappingURL=com.common.service.alertservice.js.map