"use strict";
var UniqueUsernameValidators = (function () {
    function UniqueUsernameValidators() {
    }
    UniqueUsernameValidators.userNotExists = function (userMgmtService) {
        return function (control) {
            var promise = userMgmtService.checkUserExists(control.value);
            var isUserExists = false;
            promise.then(function (res) {
                if (res.userNameExists)
                    isUserExists = true;
            });
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    if (isUserExists) {
                        resolve({ userNotExists: false });
                    }
                    else {
                        resolve({ userNotExists: true });
                    }
                }, 500);
            });
        };
    };
    UniqueUsernameValidators.shouldBeUnique = function (userMgmtService) {
        return function (control) {
            var promise = userMgmtService.checkUserExists(control.value);
            var isUserExists = false;
            promise.then(function (res) {
                if (res.userNameExists)
                    isUserExists = true;
            });
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    if (isUserExists) {
                        resolve({ shouldBeUnique: true });
                    }
                    else
                        resolve(null);
                }, 500);
            });
        };
    };
    return UniqueUsernameValidators;
}());
exports.UniqueUsernameValidators = UniqueUsernameValidators;
//# sourceMappingURL=com.usermgmt.uniqueuser.validator.js.map