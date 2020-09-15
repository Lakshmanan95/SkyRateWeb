import { Component , OnInit, OnDestroy,ElementRef, Input,Injector, ViewChild, NgZone } from '@angular/core';
import { NgForm,FormBuilder,FormGroup,Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute,RouterModule } from '@angular/router';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import { BaseComponent } from '../../common/basic/com.common.basic.basecomponent';
import { RestApiService } from '../../common/service/restapi/com.common.service.restapiservice';
import { SessionStorageService } from '../../common/service/com.common.sessionstorage';
import { BusinessService } from '../../service/com.service.business';

import {Business,BusinessRatingSummary} from '../model/com.model.business'
import {Rating, Reviews, Bookmark} from '../model/com.model.ratingReview'
import { ReviewService } from '../../service/com.serivce.review';
import { SessionDataService } from '../../common/service/com.common.sessiondata';
import { CookieService } from 'ngx-cookie-service';
import { identifierModuleUrl } from '@angular/compiler';
import { UniqueUsernameValidators } from '../../usermgmt/signup/validators/com.usermgmt.uniqueuser.validator';
import { UniqueBusinessValidators } from '../../service/com.service.businessValidators';
import { AlertService } from '../../common/service/alert/com.common.service.alertservice';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { MessageService } from '../../service/com.service.message';
declare var $ :any;
@Component({
    selector:'mail-client',
    templateUrl:'com.main.mailToClient.html',
    styleUrls:['com.main.mailToClient.css'],
    providers: [RestApiService, ReviewService,SessionDataService]
})
export class MailToClientComponent extends BaseComponent{
    id: number=0;businessName:string;
    subscription;
    userId:number = 0;
    items=[];
    roleId:number = 0;
    subject:string;
    isSpin:boolean = false;
    body:string;
    mailForm :FormGroup;

    constructor(injector:Injector,private _router: Router,
        private mapsAPILoader : MapsAPILoader, private ngZone: NgZone,
        private elRef:ElementRef,private cookieService: CookieService,
        private _location: Location,
                  private _route: ActivatedRoute,
                  private _restApiService: RestApiService,
                  private _messageService:MessageService,
                  private _ratingService: ReviewService,private fb: FormBuilder){
        super(injector)
        }

    ngOnInit(){
        this.subscription= this._route.params.subscribe(params=>{
            this.id=+params["id"];
            this._sessionStorageService.setObject("businessId",this.id);
        this.getUserId();
        SessionDataService.getInstance().refresh$.subscribe(value =>{
            this.getUserId();
    });
        this.mailForm = this.fb.group({
          _to: ['',Validators.required],
            _subject:[''],
            _body:['',Validators.required],

         });
    });
    }
    public onTagEdited(item) {
        console.log('tag edited: current value is ' + item);
    }
    getUserId(){
        this.userId = this._sessionStorageService.getObject("userId");
        if(this.userId == null)
        this.userId = 0;
        this.roleId = this._sessionStorageService.getObject("roleId");
    }
    mailSubmit(){
        console.log(" submited items ",this.items)
        this.isSpin = true;
        var request = {
            mailRecipient:this.items,
            subject:this.subject,
            body:this.body,
            userMail:this.userId
        }
        this._messageService.mailToClient(request).then(res => this.cb_mailToClient(res))
    }
    cb_mailToClient(res){
        this.isSpin = false;
        if(res.isSuccess){
            this.mailForm.reset();
            this.items = [];
            $('#emailSuccess').modal('toggle');
        }
        else{
            AlertService.getInstance().publishMessage('danger','Email send failed..')
        }
    }
    emailValidators = [this.email]

    email(control: AbstractControl): ValidationErrors|null {
        return /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/.test(control.value) ? null : {'email': true};
      }
}
