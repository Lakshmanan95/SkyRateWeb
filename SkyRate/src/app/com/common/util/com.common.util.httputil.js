"use strict";
var http_1 = require('@angular/http');
var http_2 = require('@angular/http');
var HttpUtil = (function () {
    function HttpUtil() {
    }
    HttpUtil.getHeaderOptions = function () {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        var options = new http_2.RequestOptions({
            headers: headers
        });
        return options;
    };
    return HttpUtil;
}());
exports.HttpUtil = HttpUtil;
//# sourceMappingURL=com.common.util.httputil.js.map