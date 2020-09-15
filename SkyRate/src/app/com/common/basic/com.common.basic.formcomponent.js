"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var router_1 = require('@angular/router');
var com_common_basic_basecomponent_1 = require('./com.common.basic.basecomponent');
var FormComponent = (function (_super) {
    __extends(FormComponent, _super);
    // protected _route : Route;
    function FormComponent(injector) {
        _super.call(this, injector);
        console.log("base component loaded");
        this._router = injector.get(router_1.Router);
        //  this._route = injector.get(Route;
    }
    return FormComponent;
}(com_common_basic_basecomponent_1.BaseComponent));
exports.FormComponent = FormComponent;
//# sourceMappingURL=com.common.basic.formcomponent.js.map