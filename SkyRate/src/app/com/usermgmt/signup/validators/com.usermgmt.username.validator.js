"use strict";
var com_service_uservalidation_1 = require('../../service/com.service.uservalidation');
var com_service_usermgmt_1 = require('../../service/com.service.usermgmt');
var core_1 = require('@angular/core');
var com_common_service_logging_1 = require('../../../common/service/logging/com.common.service.logging');
var com_common_service_config_configmanager_1 = require('../../../common/service/config/com.common.service.config.configmanager');
var http_1 = require('@angular/http');
var UsernameValidators = (function () {
    function UsernameValidators(ss) {
    }
    UsernameValidators.cannotContainSpace = function (control) {
        if (control.value) {
            if (control.value.indexOf(' ') >= 0)
                return ({ cannotContainSpace: true });
        }
    };
    UsernameValidators.confirmPassword = function (control1, control2) {
        // debugger;
        // alert(control1);
        // alert(control2);
        return;
    };
    UsernameValidators.shouldBeUnique = function (control, str) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (control.value == "raj") {
                    var injector = core_1.ReflectiveInjector.resolveAndCreate([com_service_uservalidation_1.UserValidationService, com_service_usermgmt_1.UserMgmtService, com_common_service_logging_1.LoggingService, com_common_service_config_configmanager_1.ConfigService, http_1.Http]);
                    var service = injector.get(com_service_uservalidation_1.UserValidationService);
                    service.checkUserExists("eS");
                    resolve({ shouldBeUnique: true });
                }
                else
                    resolve(null);
            }, 1000);
        });
    };
    UsernameValidators.userExists = function (control, str) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (control.value == "raj") {
                    var injector = core_1.ReflectiveInjector.resolveAndCreate([com_service_uservalidation_1.UserValidationService, com_service_usermgmt_1.UserMgmtService, com_common_service_logging_1.LoggingService, com_common_service_config_configmanager_1.ConfigService, http_1.Http]);
                    var service = injector.get(com_service_uservalidation_1.UserValidationService);
                    service.checkUserExists("eS");
                    resolve({ userExists: true });
                }
                else
                    resolve(null);
            }, 1000);
        });
    };
    return UsernameValidators;
}());
exports.UsernameValidators = UsernameValidators;
//# sourceMappingURL=com.usermgmt.username.validator.js.map