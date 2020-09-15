import {Component,Injector} from '@angular/core'
import { BaseComponent } from '../../common/basic/com.common.basic.basecomponent';
import { RestApiService } from '../../common/service/restapi/com.common.service.restapiservice';
import { Router, ActivatedRoute,RouterModule } from '@angular/router';
import {IMyDpOptions,IMyDateModel} from 'mydatepicker';
import { BusinessService } from '../../service/com.service.business';
import {PopoverModule} from "ngx-popover";
declare var $ :any;

@Component({
    selector:'business-claimed',
    templateUrl:'com.main.businessclaimed.html',
    styleUrls:['../report/com.mainmodules.report.css'],
    providers: [RestApiService,BusinessService]
})
export class BusinessClaimedComponent extends BaseComponent{

    businessClaimed:any;
    claimedDate:string ="Today"
    dateDisable = new Date();
    currentPage: number = 0;
    lastPage:number;
    pageTotal:number;
    public myDatePickerOptions: IMyDpOptions = {
        // other options...
        showClearDateBtn:false,
        editableDateField:false,
        openSelectorOnInputClick:true,
        dateFormat: 'mm/dd/yyyy',
        disableSince: {year: this.dateDisable.getFullYear(), month: this.dateDisable.getMonth()+1, day: this.dateDisable.getDate()+1},
        // disableUntil: {year: 2018, month: 5, day: 10}
    };
    constructor(injector:Injector,private _router:Router,
        private _restApiService:RestApiService,
    private _businessService: BusinessService){
        super(injector);
        this.getClaimedBusiness(this.claimedDate);
        $('[data-toggle="popover"]').popover(); 
    }
    ngOnInit(){
        window.scrollTo(0, 0)
        $('#approve').show();
        $('#selection').hide();
        $('#businessDate').hide();
    }
    getClaimedBusiness(date){
        var request = {
            feedbackDate:date
        }
        this._businessService.claimedBusiness(request).then(res => this.cb_getClaimed(res));
    }
    cb_getClaimed(res){
        this.businessClaimed = res.businessClaimed;
        this.pageTotal = res.count/10;
        this.currentPage = 1;
        // this.count = this.businessClaimed.length/10;
         var i = this.pageTotal;
        
               this.lastPage = Math.round(this.pageTotal);
            if(this.lastPage == 0)
                this.lastPage = 1;
    }
    refreshVendor(){
        this.claimedDate = "Today";
         this.getClaimedBusiness(this.claimedDate);
        $('#businessCustom').show()
        $('#businessDate').hide()
    }
    onVendorDateChanged(event: IMyDateModel) {
        console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
        this.claimedDate = event.formatted
         this.getClaimedBusiness(this.claimedDate)
    }
    onVendorHits(event){
        if(event == "Custom"){
            $('#businessCustom').hide()
            $('#businessDate').show()
        }
        else {
            this.claimedDate = event
             this.getClaimedBusiness(event);
        }
    }
    updateApproval(businessId,approval){
       
        if(approval == 0)
            approval = 1;
        else
            approval = 0;
        var request = {
            businessId:businessId,
            approval:approval
        }
        this._businessService.updateApproval(request).then(res => this.cb_getApproval(res))
    }
    cb_getApproval(res){
        $('#processModal').modal('toggle');
        if(res.isSuccess){
            $('#approve').show();
            $('#selection').hide();
             this.getClaimedBusiness(this.claimedDate);
        }
    }
    approve(businessId,claimed,userId,value){
        $('#processModal').modal('toggle');
        var request = {
            businessId:businessId,
            approval:value,
            claimed:claimed,
            userId:userId
        }
        this._businessService.updateApproval(request).then(res => this.cb_getApproval(res))
    }
    updateActive(businessId,active){
        if(active == 0)
            active = 1;
        else
            active = 0;
       var request = {
           businessId:businessId,
           active:active
       }

       this._businessService.setActive(request).then(res => this.cb_setActive(res))
    }
    cb_setActive(res){
        if(res.isSuccess){
            this.getClaimedBusiness(this.claimedDate);
        }
    }
    moveToBusiness(id,name){
        this._router.navigate(['dashboard/review/', id, name]);
    }
    pagesearch(event){     
        var request = {
            feedbackDate:this.claimedDate,
            claimedValue:event
        }
        console.log("previous value "+this.currentPage)
        this._businessService.getClaimedPagination(request).then(res => this.cb_getBusiness(res))
       }
    cb_getBusiness(res){
        this.businessClaimed = res.businessClaimed
    }
    start(){
            this.currentPage = 1;
            var request = {
                feedbackDate:this.claimedDate,
                claimedValue:this.currentPage
            }
            console.log("previous value "+this.currentPage)
            this._businessService.getClaimedPagination(request).then(res => this.cb_getBusiness(res))
          
       }
       previous(){
        console.log("previous in current "+this.currentPage)
        console.log("previous in last "+this.lastPage)
          if(this.currentPage > 1){
           this.currentPage -= 1;
           var request = { 
            feedbackDate:this.claimedDate,
            claimedValue:this.currentPage
        }
           this._businessService.getClaimedPagination(request).then(res => this.cb_getBusiness(res))
           console.log("previous value "+this.currentPage)
         }
       }
       next(){
    
         if(this.lastPage > this.currentPage){
        
            var page = +this.currentPage
            page+=1;
            this.currentPage = page
            var request = {
                feedbackDate:this.claimedDate,
                claimedValue:this.currentPage,
               
            }
            console.log("page befoe send  "+page)
            this._businessService.getClaimedPagination(request).then(res => this.cb_getBusiness(res))  
       }
      }
       end(){
         this.currentPage = this.lastPage
         var request = {
            feedbackDate:this.claimedDate,
            claimedValue:this.currentPage,
           
        }
         this._businessService.getClaimedPagination(request).then(res => this.cb_getBusiness(res))
       }
   
    
}
