
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Injectable, Inject,ViewChild,ElementRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Subject }    from 'rxjs/Subject';
import {Injector} from '@angular/core';


import {ConfigService} from './../common/service/config/com.common.service.config.configmanager';
import {LoggingService} from './../common/service/logging/com.common.service.logging';
import {HttpUtil} from './../common/util/com.common.util.httputil'
import {SessionDataService} from '../common/service/com.common.sessiondata'
import {UserProfileService} from '../usermgmt/service/com.service.userprofile';
import {SessionStorageService} from '../common/service/com.common.sessionstorage';
import {BaseService} from '../common/basic/com.common.basic.baseservice';
import {Observable} from 'rxjs/Observable';
import { URLSearchParams , Http } from '@angular/http';
@Injectable()
export class ReviewService extends BaseService{

    private ADD_RATING_URL=  this._APIURL+ "/rating/addRating";
    // private EDIT_REVIEW_URL = this._APIURL + "/rating/addReview"
    private GET_REVIEW_PAGINATION_URL = this._APIURL+ "/rating/getReviewByPagination";
    private GET_BOOKMARK_URL = this._APIURL+ "/rating/getBookmark"
    private UPDATE_BOOKMARK_URL = this._APIURL+ "/rating/updateBookmark"
    private ADD_EVENT_URL = this._APIURL+ "/report/addEvent"
    private GET_TOTALHITS_URL = this._APIURL+ "/report/getTotalHits"
    private GET_VENDOR_EVENT_URL = this._APIURL+ "/report/getVendorEvent"
    private GET_FEEDBACK_EVENT_URL = this._APIURL+ "/report/getFeedbackEvent"
    private GET_USERREPORT_EVENT_URL = this._APIURL+ "/report/getUserReport"
    private EDIT_REVIEW_URL = this._APIURL+ "/rating/addReview"
    private DELETE_REVIEW_URL = this._APIURL+ "/rating/deleteReview"
    private MAIL_TO_REVIEWER = this._APIURL+ "/rating/mailToReviewer"
    private CLAIM_BUSINESS_URL = this._APIURL+ "/business/claimBusiness"
    private CHECK_FOR_REVIEW_URL = this._APIURL+ "/rating/checkForReview"
    private EDIT_REPLY_URL = this._APIURL+ "/rating/editReply"
    private DELETE_REPLY_URL = this._APIURL+ "/rating/deleteReply"
    userId :any;

    constructor(
        private _userProfileService: UserProfileService,
        injector:Injector) {

          super(injector);
          //this.initURL(this._configService);
          this.userId = _userProfileService.getUserId();
       //   this._loggingService.logDebug( this.getName(), "APIService"+this._configService.getProperty("APIService"));
          this._loggingService.logInfo( this.getName(), "UserId:"+this.userId);

          
    }
    
    addRating(request:any){
        return this._http.post(this.ADD_RATING_URL,JSON.stringify(request),this._httpHeaderOptions)
        .toPromise()
        .then(res=>res.json())
    }
    getReviewPagination(request:any){
        return this._http.post(this.GET_REVIEW_PAGINATION_URL,JSON.stringify(request),this._httpHeaderOptions)
        .toPromise()
        .then(res=>res.json())
    }
    editReview(request:any){
        return this._http.post(this.EDIT_REVIEW_URL,JSON.stringify(request),this._httpHeaderOptions)
        .toPromise()
        .then(res=>res.json())
    }
    deleteReview(request:any){
        return this._http.post(this.DELETE_REVIEW_URL,JSON.stringify(request),this._httpHeaderOptions)
        .toPromise()
        .then(res=>res.json())
    }
    getBookmark(request:any){
        return this._http.post(this.GET_BOOKMARK_URL,JSON.stringify(request),this._httpHeaderOptions)
        .toPromise()
        .then(res=>res.json())
    }
    addBookmark(request:any){
        return this._http.post(this.UPDATE_BOOKMARK_URL,JSON.stringify(request),this._httpHeaderOptions)
        .toPromise()
        .then(res=>res.json())
    }
    addEvent(request:any){
        return this._http.post(this.ADD_EVENT_URL,JSON.stringify(request),this._httpHeaderOptions)
        .toPromise()
        .then(res=>res.json())
    }
    getTotalHits(request:any){
        return this._http.post(this.GET_TOTALHITS_URL,JSON.stringify(request),this._httpHeaderOptions)
        .toPromise()
        .then(res=>res.json())
    }
    vendorEvent(request:any){
        return this._http.post(this.GET_VENDOR_EVENT_URL,JSON.stringify(request),this._httpHeaderOptions)
        .toPromise()
        .then(res=>res.json())
    }
    feedbackEvent(request:any){
        return this._http.post(this.GET_FEEDBACK_EVENT_URL,JSON.stringify(request),this._httpHeaderOptions)
        .toPromise()
        .then(res=>res.json())
    }
    userReport(request:any){
        return this._http.post(this.GET_USERREPORT_EVENT_URL,JSON.stringify(request),this._httpHeaderOptions)
        .toPromise()
        .then(res=>res.json())
    }
    mailToReviewer(request:any){
        return this._http.post(this.MAIL_TO_REVIEWER,JSON.stringify(request),this._httpHeaderOptions)
        .toPromise()
        .then(res=>res.json())
    }
    claimBusiness(request:any){
        return this._http.post(this.CLAIM_BUSINESS_URL,JSON.stringify(request),this._httpHeaderOptions)
        .toPromise()
        .then(res=>res.json())
    }
    checkForReview(request:any){
        return this._http.post(this.CHECK_FOR_REVIEW_URL,JSON.stringify(request),this._httpHeaderOptions)
        .toPromise()
        .then(res=>res.json())
    }
    editBusinessReply(request:any){
        return this._http.post(this.EDIT_REPLY_URL,JSON.stringify(request),this._httpHeaderOptions)
        .toPromise()
        .then(res=>res.json())
    }
    deleteBusinessReply(request:any){
        return this._http.post(this.DELETE_REPLY_URL,JSON.stringify(request),this._httpHeaderOptions)
        .toPromise()
        .then(res=>res.json())
    }
}