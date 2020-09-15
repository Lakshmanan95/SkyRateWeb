import {Component, Injector} from '@angular/core'
import {Router, ActivatedRoute} from '@angular/router'
import { BaseComponent } from '../../common/basic/com.common.basic.basecomponent';
import {UserMgmtService} from '../../usermgmt/service/com.service.usermgmt';
import {SessionStorageService} from '../../common/service/com.common.sessionstorage';

@Component({
    selector:'welcome-info',
    templateUrl:'com.mainmodules.welcomeInfo.html',
    styleUrls:['com.mainmodules.welcomeInfo.css'],
    providers: [UserMgmtService, SessionStorageService]
})

export class WelcomeInfo extends BaseComponent{

    token:string;
    emailVerificationStatus;
    constructor(
        injector:Injector,
        private _router : Router,
        private _route : ActivatedRoute,
        private _userMgmtService: UserMgmtService
    ){
        super(injector);
        this.emailVerfication()
    }

    ngOnInit(){
        this.token = this._route.snapshot.queryParamMap.get('token')
        console.log("token checking "+this.token)
        this._sessionStorageService.setObject("firstToken",this.token);
        console.log("token checking "+this._sessionStorageService.getObject("firstToken"))
    }
    emailVerfication() {
        this.token = this._route.snapshot.queryParamMap.get('token')
       // this.token = this._sessionStorageService.getObject('firstToken');
        // this._sessionStorageService.clear();
        var request = {
          token: this.token
        };
        this._userMgmtService.emailVerification(request).then(res => this.cb_emailVerfication(res));
    
      }
      cb_emailVerfication(res){
        //  alert(res.isSuccess)
        if(res.isSuccess){
            this.emailVerificationStatus=true;
            //alert(true);
        }else{
            this.emailVerificationStatus=false;
        }
      }
    loginPage(){
        this._router.navigate([''])
    }
}