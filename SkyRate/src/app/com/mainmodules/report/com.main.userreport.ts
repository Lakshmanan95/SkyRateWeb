import {Component, Injector} from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router'

import { BusinessService } from '../../service/com.service.business';
import { BaseComponent } from '../../common/basic/com.common.basic.basecomponent';
import {User} from '../../usermgmt/model/com.usermgmt.user.model'
import { FormComponent } from '../../common/basic/com.common.basic.formcomponent';
import { SessionDataService } from '../../common/service/com.common.sessiondata';
import { RestApiService } from '../../common/service/restapi/com.common.service.restapiservice';
import { SessionStorageService } from '../../common/service/com.common.sessionstorage';



@Component({
    selector:'user-report',
    templateUrl:'com.main.userreport.html',
    styleUrls:['com.main.userreport.css'],
    providers:[BusinessService,SessionDataService,RestApiService]
})
export class UserReportComponent extends BaseComponent{
    subscription;
    userId:number;
    user = new User();
    report:any;
    name:string;
    roleId:number = 4;
    isChecked:boolean = false;
   
    constructor(injector:Injector,
        private _router : Router,
        private _businessService : BusinessService,
        private _restApiService : RestApiService,
        private _route : ActivatedRoute,
       ) {
        super(injector); 
      
    }

    ngOnInit(){
        
          this.subscription= this._route.params.subscribe(params=>{
              this.userId=+params["id1"];
              var name = +params["id2"]
         this.getReport(this.userId)
        });
          this.roleId = this._sessionStorageService.getObject('roleId');
      }
      getReport(id){
          this._restApiService.getById('/report/userReport/',id).then(res => this.cb_getReport(res))
      }
      cb_getReport(res){
          this.report = res.report;
          this.user = res.user;
      }
}