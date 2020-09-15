import {Component, Injector} from '@angular/core'
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';

import { BusinessService } from '../../service/com.service.business';
import { BaseComponent } from '../../common/basic/com.common.basic.basecomponent';
import { RestApiService } from '../../common/service/restapi/com.common.service.restapiservice';
import { SessionDataService } from '../../common/service/com.common.sessiondata';

import { User } from '../../usermgmt/model/com.usermgmt.user.model';
import { SessionStorageService } from '../../common/service/com.common.sessionstorage';
import { AlertService } from '../../common/service/alert/com.common.service.alertservice';

declare var $:any;

@Component({
    selector:'termsofuse',
    templateUrl: 'com.termsofuse.html',
    styleUrls: ['com.termsofuse.css'],
    providers: [BusinessService,RestApiService, SessionDataService]
})
export class Termsofuse extends BaseComponent {

    user =  new User() ;
    contactForm : FormGroup;
    isSpin:boolean = false;
    userName:string;
    subject:string;
    message:string;
    contacts:any;

    constructor(injector:Injector,public _sessionStorageService:SessionStorageService,
        private _businessService : BusinessService,
        private _restApiService : RestApiService,
        private _location: Location,
        private _router : Router, private fb: FormBuilder
       ) {
        super(injector); 
               
        window.scrollTo(0, 0);
       
    }
    
    
   
}