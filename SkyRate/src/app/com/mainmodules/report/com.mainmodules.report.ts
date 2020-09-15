import { Component , OnInit, OnDestroy,ElementRef, Input,Injector, ViewChild } from '@angular/core';
import { NgForm,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router, ActivatedRoute,RouterModule } from '@angular/router';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import { BaseComponent } from '../../common/basic/com.common.basic.basecomponent';
import { RestApiService } from '../../common/service/restapi/com.common.service.restapiservice';
import { SessionStorageService } from '../../common/service/com.common.sessionstorage';
import { BusinessService } from '../../service/com.service.business';

import {Business,BusinessRatingSummary} from '../model/com.model.business'
import { ReviewService } from '../../service/com.serivce.review';
import { SessionDataService } from '../../common/service/com.common.sessiondata';
import {IMyDpOptions,IMyDateModel} from 'mydatepicker';
import { UserMgmtService } from '../../usermgmt/service/com.service.usermgmt';
declare var $ :any;
@Component({
    selector:'report',
    templateUrl:'com.mainmodules.report.html',
    styleUrls:['com.mainmodules.report.css'],
    providers: [RestApiService,BusinessService,ReviewService,SessionDataService,UserMgmtService]
})
export class ReportComponent extends BaseComponent{

    // date:string= "Today";
    userCount:number;
    totalHits:number;
    vendorSearch:any;
    vendorFeedback:any;
    vendorDate:string="Today";
    feedbackDate:string="Today";
    nextVendors:number=10;
    nextFeedback:number=10;
    rank=[1,2,3,4,5,6,7,8,9,10]
    dateDisable = new Date();
    totalHitsDate:string="Today";
    hitChange:string ="Today";
    sortSelection:string = "Vendor";
    value:string = "Search"
 
    constructor(injector:Injector,private _router: Router,
        private elRef:ElementRef,
        private _location: Location,
                  private _route: ActivatedRoute,
                  private _usermgmtService:UserMgmtService,
                  private _restApiService: RestApiService,
                  private _businessService:BusinessService,
                  private _ratingService: ReviewService,private fb: FormBuilder){
        super(injector)
        this.getUserCount(this.totalHitsDate);
        this.getTotalHits(this.totalHitsDate);
       this.getVendorEvent(this.vendorDate);
       this.getFeedbackEvent(this.feedbackDate);

    }
    ngOnInit(){
        $('#date').hide();
        $('#vendorDate').hide();
        $('#feedbackDate').hide();
    }
    public myDatePickerOptions: IMyDpOptions = {
        // other options...
        showClearDateBtn:false,
        editableDateField:false,
        openSelectorOnInputClick:true,
        dateFormat: 'mm/dd/yyyy',
        disableSince: {year: this.dateDisable.getFullYear(), month: this.dateDisable.getMonth()+1, day: this.dateDisable.getDate()+1},
        // disableUntil: {year: 2018, month: 5, day: 10}
    };
    getUserCount(date){
        var request = {
            date:date
        }
        this._usermgmtService.usercount(request).then(res => this.userCount = res.count)
    }
    getTotalHits(totalHitsDate){
        var request = {
            date:totalHitsDate
        }
        this._ratingService.getTotalHits(request).then(res => this.cb_getTotalHits(res) )
    }
    cb_getTotalHits(res){
        this.totalHits = res.count
        // this.totalHitsDate = res.lastUpdatedDate
        // alert(res.lastUpdatedDate)
    }
    getVendorEvent(date){
        var request = {
            vendorDate:date,
            value:this.value
        }
        this._ratingService.vendorEvent(request).then(res =>this.cb_getVendorEvent(res))
    }
    cb_getVendorEvent(res){
        console.log("respone "+JSON.stringify(res))
        this.vendorSearch = res.vendorSearch;
        let value=1;
        for(let x of this.vendorSearch){
            for(let y of this.rank){
               if(value==y)
               x.id= y
            }
            value+=1;
        }
    }
    getFeedbackEvent(date){
        var request = {
            feedbackDate:date
        }
        this._ratingService.userReport(request).then(res => this.cb_getFeedbackEvent(res))
        // this._ratingService.feedbackEvent(request).then(res =>this.cb_getFeedbackEvent(res))
    }
    cb_getFeedbackEvent(res){
        this.vendorFeedback = res.report;
    }

    getNextVendors(){
        this.nextVendors = 10;
        $('#vendor').hide();
    }
    getNextFeed(){
        this.nextFeedback = 10;
        $('#feedback').hide();
    }
    refresh(){
        this.hitChange = "Today";
        this.totalHitsDate = "Today"
        $('#spin').addClass('fa-spin')
        this.getUserCount("Today");
        this.getTotalHits("Today");
        $('#spin').removeClass('fa-spin')
        $('#custom').show()
        $('#date').hide()
    }
    refreshVendor(){
        this.vendorDate = "Today";
        this.getVendorEvent(this.vendorDate);
        $('#vendorCustom').show()
        $('#vendorDate').hide()
    }
    refreshUser(){
        this.feedbackDate = "Today";
        this.getFeedbackEvent(this.feedbackDate);
        $('#feedbackCustom').show()
        $('#feedbackDate').hide()
    }
    onDateChanged(event: IMyDateModel) {
        console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
        this.totalHitsDate = event.formatted
        this.getTotalHits(this.totalHitsDate);
        this.getUserCount(this.totalHitsDate);
        console.log(this.totalHitsDate);
    }
    sorting(value){
        this.sortSelection = value;
        if(value == "Vendor"){
            this.value = "Search"
        }
        else{
            this.value = "Review"
        }
        //  alert(this.vendorDate)
        this.getVendorEvent(this.vendorDate)
    }
    onVendorDateChanged(event: IMyDateModel) {
        console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
        this.vendorDate = event.formatted
        this.getVendorEvent(this.vendorDate)
    }
    onFeedbackChanged(event: IMyDateModel) {
        console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
        this.feedbackDate = event.formatted
        this.getFeedbackEvent(this.feedbackDate)
    }
    onSelectHits(event){
        if(event == "Custom"){
            $('#custom').hide()
            $('#date').show()
        }
        else{
            this.totalHitsDate = event
            this.getTotalHits(event);
            this.getUserCount(event);
        }
    }
    onVendorHits(event){
        if(event == "Custom"){
            $('#vendorCustom').hide()
            $('#vendorDate').show()
        }
        else {
            this.vendorDate = event
            this.getVendorEvent(event);
        }
    }
    onFeedbackHits(event){
        if(event == "Custom"){
            $('#feedbackCustom').hide()
            $('#feedbackDate').show()
        }
        else{
            this.getFeedbackEvent(event);
        }
    }
    moveToUserReport(id,name){
        this._router.navigate(['business/userReport/'+id,name]);
    }
    moveToReview(id,name){
        this._router.navigate(['dashboard/review/',id,name]);
    }
}