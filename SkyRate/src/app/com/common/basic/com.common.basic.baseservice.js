"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var com_common_basic_basecomponent_1 = require('./com.common.basic.basecomponent');
var http_1 = require('@angular/http');
var com_common_util_httputil_1 = require('./../../common/util/com.common.util.httputil');
var BaseService = (function (_super) {
    __extends(BaseService, _super);
    function BaseService(injector) {
        _super.call(this, injector);
        this._http = injector.get(http_1.Http);
        // this._APIURL = this._configService.getProperty("RESTAPIService");
        this._httpHeaderOptions = com_common_util_httputil_1.HttpUtil.getHeaderOptions();
    }
    return BaseService;
}(com_common_basic_basecomponent_1.BaseComponent));
exports.BaseService = BaseService;
//# sourceMappingURL=com.common.basic.baseservice.js.map