"use strict";
var com_common_service_logging_1 = require('./../../common/service/logging/com.common.service.logging');
var com_common_service_config_configmanager_1 = require('./../../common/service/config/com.common.service.config.configmanager');
var com_common_sessionstorage_1 = require('../../common/service/com.common.sessionstorage');
var BaseComponent = (function () {
    function BaseComponent(injector) {
        console.log("base component loaded");
        this._loggingService = injector.get(com_common_service_logging_1.LoggingService);
        this._configService = injector.get(com_common_service_config_configmanager_1.ConfigService);
        this._sessionStorageService = injector.get(com_common_sessionstorage_1.SessionStorageService);
        this._APIURL = this._configService.getProperty("RESTAPIService");
    }
    BaseComponent.prototype.getName = function () {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec(this.constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    };
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=com.common.basic.basecomponent.js.map