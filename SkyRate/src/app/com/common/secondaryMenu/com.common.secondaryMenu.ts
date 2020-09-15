import { Component,ViewChild,ElementRef } from '@angular/core';
import {FormComponent} from '../../common/basic/com.common.basic.formcomponent';
import {Injector} from '@angular/core';
import {UserProfileService} from '../../usermgmt/service/com.service.userprofile';
import { RestApiService } from '../service/restapi/com.common.service.restapiservice';
import {PopoverModule} from "ngx-popover";
import { SessionStorageService } from '../service/com.common.sessionstorage';
import { SessionDataService } from '../service/com.common.sessiondata';
import { CookieService } from 'ngx-cookie-service';
import {User} from '../../usermgmt/model/com.usermgmt.user.model'
declare var $ :any;
@Component({
  moduleId:module.id,
  selector: 'secondary-menu',
  templateUrl: 'com.common.secondaryMenu.html',
  providers:[RestApiService,SessionDataService,CookieService]
})
export class SecondaryMenu extends FormComponent{
    roleId:number = 4;
    userId: number = 0;    
    isUser:boolean = false;
    forgotRefresh:number =0;
    user = new User();
    refresh:any;
    id:number;
      
     constructor(injector:Injector, private _userProfileService: UserProfileService,
      private _cookieService:CookieService,
      protected _sessionStorageService : SessionStorageService,
    private _restService:RestApiService) {
       
          super(injector);
          
          this.user = this._sessionStorageService.getObject("userProfile");
            
     }
     ngOnInit(){
      // this.openLogin();
     console.log(window.location.href)
     this.roleId = this._sessionStorageService.getObject("roleId")
     this.userId = this._sessionStorageService.getObject("userId")
     if(this.userId == null)
     this.userId = 0;
     if(this.roleId == null)
      this.roleId = 4;
;
    
    SessionDataService.getInstance().refresh$.subscribe(value => {
      this.refresh = value;
      this.userId = this._sessionStorageService.getObject("userId")
      if(this.userId == null)
      this.userId = 0;
      this.roleId = this._sessionStorageService.getObject("roleId")
      if(this.roleId == null || this.roleId == 0)
      this.roleId = 4;
    
    })
  
    }

    admin(){
      this._router.navigate(['admin/report'])
    }
    claimBusiness(){
      this._router.navigate(['business/business-claimed'])
    }
    contact(){
      this._router.navigate(['dashboard/contact']);
    }
    aboutus(){
      this._router.navigate(['dashboard/about-us']);
    }
    feedback(){
      this._router.navigate(['dashboard/feedback']);
    }
    advertisement(){
      this._router.navigate(['admin/adadvertisement']);
    }
    
    loginModal(){
      $('.signUpTab').hide();
      $('.loginTab').show();
      $('#login').addClass('new-tab');
      $('#signUp').removeClass('new-tab');
       $('#loginModal').modal('toggle');
    }
    addBusiness(){
      if(this.userId != 0)
      this._router.navigate(['business/update_business']);
    else
       this.loginModal();
    }
}