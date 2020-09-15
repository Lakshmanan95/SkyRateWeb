import { Component , OnInit, OnDestroy,ElementRef, Input,Injector, Output,EventEmitter,ViewChild } from '@angular/core';
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
declare var $ :any;
@Component({
    selector:'add-review',
    templateUrl:'com.main.addReview.html',
    styleUrls:['com.mainmodules.review.css'],
    providers: [RestApiService,BusinessService,ReviewService,SessionDataService]
})
export class AddReviewComponent extends BaseComponent{
    id: number;
    subscription;
    business = new Business();
    ratingValue:any;
    reviewList:any;
    reviewValue:any;
    pricing:number;
    @Input()
    businessId :number;
    @Input()
    editBusinessId :number=0;
    @Output()
    refreshId = new EventEmitter();
    isEditable:boolean = false;
    userId:number = 0;
    rating = new Rating();
    review = new Reviews();
    bookmark = new Bookmark();
    ratingSummary = new BusinessRatingSummary();
    isModalLogin:boolean = false;
    isReviewOpen:boolean = false;
    isReviewFailure:boolean = false;
    reviewListOpen:boolean = true;
    ratingForm : FormGroup;
    createdDate = new Date()
    speedAvg:number;
    isMarked:boolean = false;
    
    constructor(injector:Injector,private _router: Router,
        private elRef:ElementRef,private cookieService: CookieService,
        private _location: Location,
                  private _route: ActivatedRoute,
                  private _restApiService: RestApiService,
                  private _businessService:BusinessService,
                  private _ratingService: ReviewService,private fb: FormBuilder){
        super(injector)
    
        this.ratingForm = this.fb.group({ 
            _rating: ['',Validators.required],
            _reviewValue: [''],
             _recommendations: ['',Validators.required],
             _pricerating:['',Validators.required],
             _speedrating:['',Validators.required]
          });

    }
    ngOnInit(){
    
       this.id = this.businessId;
       if(this.editBusinessId != 0)
        this.isEditable = true;
    //    alert(this.id)
    }

    addReview(){
        this.getUserId()
        this.review.businessId = this.id;
        this.review.review = this.reviewValue;
        this.review.ratingId = this.ratingValue;
        this.review.userId = this.userId;
        var request = {
            review:this.review,
            date: this.createdDate
        }
     
        if(this.userId != 0 && this.userId != null )
        // alert(this.review.deliverySpeed)
             this._ratingService.addRating(request).then(res =>this.cb_addReview(res))
        else{
              this.getLogin()
            }
        
    }
    getUserId(){
        this.userId = this._sessionStorageService.getObject("userId");
        if(this.userId == null)
        this.userId = 0;
    }
    cb_addReview(res){
        console.log(res)
        if(res.isSuccess){
           this.ratingForm.reset()
           this.refreshId.emit(1)
        //    this.checkValue();
        this.isReviewOpen = false;
        SessionDataService.getInstance().limitExceeds(""+0)
        //    this.addEventLog(this.id,'Review')
        this.mapWishListResponse();
        }
        else{
            this.ratingForm.reset()
            $('#exceedModal').modal('toggle');
            
        }
       
    }
    addEventLog(id,value){
        var request = {
            userId:this.userId,
            event:value,
            businessId:id,
            uniqueId:this.cookieService.get('Test')
        }
        this._ratingService.addEvent(request).then(res => console.log(res))
    }
    reviewTab(){
        this.isReviewOpen = true;
    }
    getLogin(){
            $('.signUpTab').hide();
            $('.loginTab').show();
            $('#login').addClass('new-tab')
            $('#signUp').removeClass('new-tab');
             $('#loginModal').modal('toggle');
    }
    mapWishListResponse(){
        SessionDataService.getInstance().updateWishListActive(""+this.id)
      }
   
}