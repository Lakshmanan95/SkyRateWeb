import { Component , OnInit, OnDestroy,ElementRef, Input,Injector, ViewChild, NgZone } from '@angular/core';
import { NgForm,FormBuilder,FormGroup,Validators } from '@angular/forms';
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
import {MatAutocompleteTrigger} from '@angular/material'
import { ClickOutsideDirective } from 'angular2-multiselect-dropdown/clickOutside';
import { Advertisement } from '../model/com.model.advertisement';

declare var $ :any;
@Component({
    selector:'adadvertisement',
    templateUrl:'com.adadvertisement.html',
    styleUrls:['com.adadvertisement.css'],
    providers: [RestApiService,BusinessService,ReviewService,SessionDataService]
})
export class AdComponent extends BaseComponent{

    id: number=0;businessName:string;
    advertisement = new Advertisement();
    dummyList =[];
    subscription;
    options:any;
    userId:number = 0;
    roleId:number = 4;
    adButton:string = "Edit";
    showButton:boolean = false;
    isExistingAdImageAvailable:boolean = false;
  
    adImageWebsite:string;
    fileName:string;
    AD_IMAGE_UPLOADER_URL = "upload/adImageUploader";
    // @ViewChild('search') public searchElement : ElementRef;
    constructor(injector:Injector,private _router: Router,
        private mapsAPILoader : MapsAPILoader, private ngZone: NgZone,
        private elRef:ElementRef,private cookieService: CookieService,
        private _location: Location,
                  private _route: ActivatedRoute,
                  private _restApiService: RestApiService,
                  private _businessService:BusinessService,
                  private _ratingService: ReviewService,private fb: FormBuilder){
        super(injector)
          
        }

    ngOnInit(){
   
    }
   
   
    
    modalUpdate(){
        $('#successModal').modal('toggle');       
    }
    modalSave(){
        // $('#saveModal').modal('toggle');
        this._location.back();
        console.log("back")
    }
  
  
    
      adEditPicture(){
        this.isExistingAdImageAvailable = !this.isExistingAdImageAvailable;
        if(this.isExistingAdImageAvailable){
            this.adButton = "Edit"
        }
        else{
            this.showButton = true;
            this.adButton = "Cancel"
        }
    }
 
    adUpload(event){
        this.advertisement.advertisementUrl = event.uploadedURL
        this.showButton = true
        this.adButton = "Edit"
    }
    addMore(){
        this.dummyList.push(this.advertisement)
        console.log(JSON.stringify(this.dummyList))
        this.advertisement.advertisementUrl = "";
        this.advertisement.websiteLink = "";
    }
    save(){
       
    }
    cancel(){
        this._location.back();
    }

   
}