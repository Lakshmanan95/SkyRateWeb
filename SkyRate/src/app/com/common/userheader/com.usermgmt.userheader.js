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
var router_1 = require('@angular/router');
var com_common_sessionstorage_1 = require('../../common/service/com.common.sessionstorage');
var UserHeader = (function () {
    function UserHeader(_router, _sessionStorageService) {
        this._router = _router;
        this._sessionStorageService = _sessionStorageService;
        this.userName = '';
        this.getLoggedUser();
        // alert(document.location.hostname);
    }
    /* ngOnInit(): void {
      let timer = TimerObservable.create(2, 1000);
       this.subscription = timer.subscribe(t => {
           console.log("YYYY##")
          
       });
       
     }
     ngAfterViewInit() {
       
      // this.setTimeOut2()
     }
     setTimeOut2(){
          setTimeout(() => {
               this.getLoggedUser()
           },100 );
     }
      ngOnDestroy() {
      // this.subscription.unsubscribe();
     }
     */
    UserHeader.prototype.getLoggedUser = function () {
        var userProfileObj = this._sessionStorageService.getObject("userProfile");
        var userName;
        if (userProfileObj) {
            userName = userProfileObj["firstName"];
        }
        if (userName != null) {
            this.userName = userName;
        }
    };
    UserHeader.prototype.logout = function () {
        this._sessionStorageService.clear();
        this.userName = '';
        this._router.navigate(['']);
    };
    UserHeader.prototype.showUserProfile = function () {
        this._router.navigate(['dashboard/user-profile']);
    };
    UserHeader = __decorate([
        core_1.Component({
            selector: 'user-header',
            templateUrl: 'app/com/common/userheader/com.usermgmt.userheader.html',
            providers: [com_common_sessionstorage_1.SessionStorageService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, com_common_sessionstorage_1.SessionStorageService])
    ], UserHeader);
    return UserHeader;
}());
exports.UserHeader = UserHeader;
//# sourceMappingURL=com.usermgmt.userheader.js.map