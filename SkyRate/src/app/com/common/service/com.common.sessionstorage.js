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
var SessionStorageService = (function () {
    function SessionStorageService() {
    }
    SessionStorageService.prototype.setItem = function (key, valueObj) {
        sessionStorage.setItem(key, valueObj);
    };
    SessionStorageService.prototype.getItem = function (key) {
        return sessionStorage.getItem(key);
    };
    SessionStorageService.prototype.setObject = function (key, valueObj) {
        sessionStorage.setItem(key, JSON.stringify(valueObj));
    };
    SessionStorageService.prototype.getObject = function (key) {
        return JSON.parse(sessionStorage.getItem(key));
    };
    SessionStorageService.prototype.setObjectInLocalStorage = function (key, valueObj) {
        localStorage.setItem(key, JSON.stringify(valueObj));
    };
    SessionStorageService.prototype.getObjectFromLocalStorage = function (key) {
        return JSON.parse(localStorage.getItem(key));
    };
    SessionStorageService.prototype.clear = function () {
        var data = sessionStorage.getItem("configData");
        sessionStorage.clear();
        sessionStorage.setItem("configData",JSON.stringify(data));
    };
    SessionStorageService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SessionStorageService);
    return SessionStorageService;
}());
exports.SessionStorageService = SessionStorageService;
//# sourceMappingURL=com.common.sessionstorage.js.map