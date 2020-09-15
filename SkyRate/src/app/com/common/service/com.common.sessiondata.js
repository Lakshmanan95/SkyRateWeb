"use strict";
var Subject_1 = require('rxjs/Subject');
var SessionDataService = (function () {
    function SessionDataService() {
        this.totalCartItemCountSource = new Subject_1.Subject();
        this.totalCartItemCount$ = this.totalCartItemCountSource.asObservable();
        if (!SessionDataService.isCreating) {
            throw new Error("You can't call new in Singleton instances!");
        }
    }
    SessionDataService.getInstance = function () {
        if (SessionDataService.instance == null) {
            SessionDataService.isCreating = true;
            SessionDataService.instance = new SessionDataService();
            SessionDataService.isCreating = false;
        }
        return SessionDataService.instance;
    };
    SessionDataService.prototype.setMessage = function (msg) {
        this.message = msg;
        console.log(this.message);
    };
    SessionDataService.prototype.getMessage = function () {
        return this.message;
        //console.log(message);
    };
    SessionDataService.prototype.setObject = function (key, valueObj) {
        localStorage.setItem(key, valueObj);
    };
    SessionDataService.prototype.getObject = function (key) {
        return localStorage.getItem(key);
    };
    SessionDataService.prototype.updateTotalCartItemsCount = function (totalStr) {
        this.totalCartItemCountSource.next(totalStr);
    };
    SessionDataService.isCreating = false;
    return SessionDataService;
}());
exports.SessionDataService = SessionDataService;
//# sourceMappingURL=com.common.sessiondata.js.map