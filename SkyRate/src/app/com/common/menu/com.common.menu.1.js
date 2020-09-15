"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var com_common_basic_formcomponent_1 = require('../../common/basic/com.common.basic.formcomponent');
var core_2 = require('@angular/core');
var Menu = (function (_super) {
    __extends(Menu, _super);
    function Menu(injector) {
        _super.call(this, injector);
        var userProfile = this._sessionStorageService.getObject("userProfile");
        this.roleId = userProfile["roleId"];
        this._loggingService.logDebug(this.getName(), "User RoleId" + this.roleId);
    }
    Menu = __decorate([
        core_1.Component({
            selector: 'my-menu',
            templateUrl: 'app/com/common/menu/com.common.menu.html'
        }), 
        __metadata('design:paramtypes', [core_2.Injector])
    ], Menu);
    return Menu;
}(com_common_basic_formcomponent_1.FormComponent));
exports.Menu = Menu;
//# sourceMappingURL=com.common.menu.1.js.map