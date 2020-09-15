import {Component, Injector} from '@angular/core'
import { Router } from '@angular/router';

import { BusinessService } from '../../service/com.service.business';
import { BaseComponent } from '../../common/basic/com.common.basic.basecomponent';
import { RestApiService } from '../../common/service/restapi/com.common.service.restapiservice';
import { SessionDataService } from '../../common/service/com.common.sessiondata';
import {Business} from '../model/com.model.business';

declare var $ :any;

@Component({
    selector:'ad',
    templateUrl: 'com.advertisement.html',
    styleUrls: ['com.advertisement.css'],
    providers: [BusinessService,RestApiService, SessionDataService]
})
export class AdvertisementComponent extends BaseComponent {

    adDetails:any;
    adAvailable:boolean = true;
    businessId:number;
    business = new Business();
    overallAd:boolean = true;
    adBanner1:string;
    adBanner2:string;
    adBanner3:string;
   
    constructor(injector:Injector,
        private _businessService : BusinessService,
        private _restApiService : RestApiService,
        private _router : Router
       ) {
        super(injector); 
       
        this.getAd()
    }

    ngOnInit(){
        $(document).ready(function() {
            $('#myCarousel1').carousel({
              pause: false,
              interval: 5000,
            });

            $(function($) { 
                
                  // settings
                  var $slider = $('.slider'); // class or id of carousel slider
                  var $slide = 'div'; // could also use 'img' if you're not using a ul
                  var $transition_time = 0; // 1 second
                   var $time_between_slides = 5000; // 4 seconds
                
                  function slides(){
                    return $slider.find($slide);
                  }
                
                  slides().fadeOut();
                
                  // set active classes
                  slides().first().addClass('active');
                  slides().first().fadeIn($transition_time);
                
                  // auto scroll 
                var  $interval = setInterval(
                    function(){
                      var $i = $slider.find($slide + '.active').index();
                
                      slides().eq($i).removeClass('active');
                      slides().eq($i).fadeOut($transition_time);
                
                      if (slides().length == $i + 1) $i = -1; // loop to start
                
                      slides().eq($i + 1).fadeIn($transition_time);
                      slides().eq($i + 1).addClass('active');
                    }
                    , $transition_time + $time_between_slides
                  );
                
                });
          });


     
        SessionDataService.getInstance().showingAd$.subscribe(value =>{
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
    }
    activeStyle(index){
        if(index == 0)
         $('#activeBanner').addClass('active')
        
         
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
        this._restApiService.get('/business/getAd').then(res => this.cb_getAd(res))
    }
   
    cb_getAd(res){
        // alert(JSON.stringify(res))
        if(res.isSuccess)
        this.adDetails = res.adDetails;
        else
            this.adAvailable = false;
        // alert(this.adBanner1)
    }
    getClass(index){
        let i =0;
        for(i = 0; i < 4; i++){
            $(index).addClass('active')
        }        
    }

    moveToWebsite(businessId,businessName, website){
       if(website != null)
       window.open(website, "_blank");
       else
       this._router.navigate(['dashboard/review/'+businessId,businessName]);
    }
}