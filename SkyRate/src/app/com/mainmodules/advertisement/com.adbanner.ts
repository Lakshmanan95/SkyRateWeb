import {Component, Injector} from '@angular/core'
import { Router } from '@angular/router';

import { BusinessService } from '../../service/com.service.business';
import { BaseComponent } from '../../common/basic/com.common.basic.basecomponent';
import { RestApiService } from '../../common/service/restapi/com.common.service.restapiservice';
import { SessionDataService } from '../../common/service/com.common.sessiondata';
import {Business} from '../model/com.model.business';
declare var $:any;
@Component({
    selector:'ad-banner',
    templateUrl: 'com.adBanner.html',
    styleUrls: ['com.adBanner.css'],
    providers: [BusinessService,RestApiService, SessionDataService]
})
export class AdBannerComponent extends BaseComponent {

    adDetails:any=new Array()  ;
    adAvailable:boolean = true;
    businessId:number;
    business = new Business();
    overallAd:boolean = true;

    constructor(injector:Injector,
        private _businessService : BusinessService,
        private _restApiService : RestApiService,
        private _router : Router
       ) {
        super(injector); 
       
        
    }

    ngOnInit(){

     /*   $(document).ready(function() {
            $('#myCarousel').carousel({
              pause: false,
              interval: 2000,
            });
          });*/
     
      /*  SessionDataService.getInstance().showingAd$.subscribe(value =>{
           var x = value;
           this.businessId = +x;
           if(this.businessId != 0){
            this.getBusinessById(this.businessId);
            this.overallAd = false;
           }
           else{
               this.overallAd = true;
           }
        });
*/
        this.getAd();
    }

    getBusinessById(id){
        var request = {
            id:id
        }
     this._businessService.getBusinessById(request).then(res => this.cb_getBusiness(res) )
    }
    cb_getBusiness(res){
        this.business = res.business;
    }
    getAd(){
        this._restApiService.get('/advertisement/getBannerImages').then(res => this.cb_getAd(res))
    }
    cb_getAd(res){
        // alert(JSON.stringify(res))
        if(res.isSuccess)
        this.adDetails = res.adBannerImage;
        else
            this.adAvailable = false;
        console.log("response "+JSON.stringify(this.adDetails))
    }

    moveToWebsite(businessId,businessName, website){
       if(website != null)
       window.open(website, "_blank");
       else
       this._router.navigate(['dashboard/review/'+businessId,businessName]);
    }
    moveToPage(link){
        window.open(link, "_blank");
    }
}