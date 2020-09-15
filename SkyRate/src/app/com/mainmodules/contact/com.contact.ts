import {Component, Injector} from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';

import { BusinessService } from '../../service/com.service.business';
import { BaseComponent } from '../../common/basic/com.common.basic.basecomponent';
import { RestApiService } from '../../common/service/restapi/com.common.service.restapiservice';
import { SessionDataService } from '../../common/service/com.common.sessiondata';
import {Business} from '../model/com.model.business';
import { User } from '../../usermgmt/model/com.usermgmt.user.model';
import { SessionStorageService } from '../../common/service/com.common.sessionstorage';
import { AlertService } from '../../common/service/alert/com.common.service.alertservice';
declare var $:any;

@Component({
    selector:'contact',
    templateUrl: 'com.contact.html',
    styleUrls: ['com.contact.css'],
    providers: [BusinessService,RestApiService, SessionDataService]
})
export class ContactComponent extends BaseComponent {

    user =  new User() ;
    contactForm : FormGroup;
    isSpin:boolean = false;
    isContact:boolean = true;
    userName:string;
    subjectId:number;
    subject:string;
    subjectList:any;
    message:string;
    contacts:any;
    nameOfHeader:string ="Send Message"
    businessId:number;

    constructor(injector:Injector,public _sessionStorageService:SessionStorageService,
        private _businessService : BusinessService,
        private _restApiService : RestApiService,
        private _location: Location,
        private _route: ActivatedRoute,
        private _router : Router, private fb: FormBuilder
       ) {
        super(injector); 
       
        this.user = this._sessionStorageService.getObject("userProfile");
        if(this.user!= null)
        this.userName = this.user.firstName+" "+this.user.lastName
        else
        this.user = new User();
        this.contactForm = this.fb.group({
            _userName: ['',Validators.required],
             _email: ['', Validators.required],
              _phoneNumber: [''],
            _subject:['',Validators.required],
            _message:['',Validators.required,]
        });
        window.scrollTo(0, 0);
        this.getContactInfo();
        this.getSubjects();
    }
    ngOnInit(){
        if(this._router.url == "/dashboard/feedback"){
            this.nameOfHeader = "Feedback Form"
            this.isContact = false;
        }
        var id = this._route.snapshot.queryParamMap.get('business')
        this.businessId = +id;
        if(this.businessId != null && this.businessId != 0)
            this.subjectId = 2;
        
    }
    getContactInfo(){
        this._restApiService.get('/address/contactInfo').then(res => this.cb_getContactInfo(res))
    }
    cb_getContactInfo(res){
        this.contacts = res.contactInfo;
    }
    getSubjects(){
        this._restApiService.get('/report/getSubject').then(res => this.cb_getSubjects(res))
    }
    cb_getSubjects(res){
        this.subjectList = res.contactSubject;
    }
    onSubmit(){
        this.isSpin = true;
        
        if(this.isContact){
            var request = {
                email:this.user.email,
                subjectId:this.subjectId,
                message:this.message,
                userName:this.userName,
                phoneNumber:this.user.phoneNumber
            }
         this._businessService.contactUs(request).then(res => this.cb_success(res))
        }
        else{
            var feedBackRequest = {
                email:this.user.email,
                subject:this.subject,
                message:this.message,
                userName:this.userName,
                phoneNumber:this.user.phoneNumber
            }
            this._businessService.feedback(feedBackRequest).then(res => this.feedback_res(res) )
        }
    }
    feedback_res(res){
        this.isSpin = false;
        $('#feedbackSuccess').modal('toggle');
    }
    
    cb_success(res){
        this.isSpin = false;
        $('#contactSuccess').modal('toggle');
    }
    feedbackSuccess(){
        $('#feedbackSuccess').modal('toggle');
        this._router.navigate(['home']);
    }
    emailSuccess(){
        $('#contactSuccess').modal('toggle');
        this._location.back();
    }
    keyPress(event: any) {
        const pattern = /[0-9\+\-\ ]/;
    
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
          event.preventDefault();
        }
    }
    // phone(event: any){
    //     $("#input").on("keypress", function(e) {
    //         if (e.which === 32 && !this.value.length)
    //             e.preventDefault();
    //     });
    // }
}