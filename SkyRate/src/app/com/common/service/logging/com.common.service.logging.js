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
var com_common_service_config_configmanager_1 = require('../config/com.common.service.config.configmanager');
var LoggingService = (function () {
    function LoggingService(_configService) {
        this._configService = _configService;
        this.isLogDebug = false;
        this.isLogError = true;
        this.isLogInfo = true;
        this.isLogDebug = _configService.getProperty("loggingLevel")["isLogDebug"];
        this.isLogError = _configService.getProperty("loggingLevel")["isLogError"];
        this.isLogInfo = _configService.getProperty("loggingLevel")["isLogInfo"];
        console.log("[LoggingService]>>Log Level Debug :" + this.isLogDebug);
        console.log("[LoggingService]>>Log Level Info :" + this.isLogInfo);
        console.log("[LoggingService]>>Log Level Error :" + this.isLogError);
    }
    LoggingService.prototype.logInfo = function (component, msg) {
        console.log("[" + component + ":I:]>>" + msg);
    };
    LoggingService.prototype.logDebug = function (component, msg) {
        console.log("[" + component + ":D:]>>" + msg);
    };
    LoggingService.prototype.logError = function (component, msg) {
        console.log("[" + component + ":E:]>>" + msg);
    };
    LoggingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [com_common_service_config_configmanager_1.ConfigService])
    ], LoggingService);
    return LoggingService;
}());
exports.LoggingService = LoggingService;
//# sourceMappingURL=com.common.service.logging.js.map