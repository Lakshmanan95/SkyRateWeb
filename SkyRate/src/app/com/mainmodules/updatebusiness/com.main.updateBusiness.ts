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

declare var $ :any;
@Component({
    selector:'review',
    templateUrl:'com.main.updateBusiness.html',
    styleUrls:['com.main.updateBusiness.css'],
    providers: [RestApiService,BusinessService,ReviewService,SessionDataService]
})
export class UpdateBusinessComponent extends BaseComponent{

    
    @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;
    id: number=0;businessName:string;
    subscription;
    options:any;
    business = new Business();
    userId:number = 0;
    roleId:number = 4;
    optionsModel: number[];
    selectedItems = [];
    deleteItems = [];
    dropdownSettings = {};
    category  = [];
    capability = [];
    parts = []
    capabilityList:any;
    partsList:any;
    EditPictureButtonLabel:string="Edit";
    EditPartsButtonLabel:string="Edit";
    EditAdButtonLabel: string;
    businessForm :FormGroup;
    isModalOpen:boolean = false;
    isReviewOpen:boolean = false;
    states:any;country:any;
    isStateManual:boolean= false;
    isMarked:boolean = false;
    profileImage:string;
    isActive:boolean = false;
    adButton:string = "Edit";
    showButton:boolean = false;
    isExistingImageAvailable:boolean = true;
    isExistingPartsAvailable:boolean = true;
    isExistingAdImageAvailable:boolean = false;
    isExistingFileAvailable:boolean = true;
    enableWarning:boolean = false;
    uploadFileName:string[];
    fileName:string;
    FILE_UPLOADER_URL= "upload/uploader"
    BUSINESS_IMAGE_UPLOADER_URL="upload/productImageUploader";
    AD_IMAGE_UPLOADER_URL = "upload/adImageUploader";
    claimBusinessClicked:boolean=false;
    noOfCapabilityFiles:number = 0;
    noOfPartsFiles:number = 0;
    redirectToBusiness:boolean = false;
    successReviewMessage:string="";
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
    
          this.dropdownSettings = { 
            singleSelection: false, 
            text:"Select Categories",
            enableCheckAll:true,
            selectAllText:'Select All',
            labelKey:'category',
            primaryKey:'id',
            unSelectAllText:'UnSelect All',
            enableSearchFilter: true,
            classes:"myclass custom-class"
          };        
        }

    ngOnInit(){
      //  alert(1)
        this.subscription= this._route.params.subscribe(params=>{
            this.id=+params["id"];
            this.claimBusinessClicked = this._sessionStorageService.getObject('claimBusinessClicked');
            this._sessionStorageService.setObject('claimBusinessClicked', false);
          //  alert(this.claimBusinessClicked)

            this._sessionStorageService.setObject("businessId",this.id);
            this.getUserId();
        SessionDataService.getInstance().refresh$.subscribe(value =>{
            this.getUserId();

    });

        this.businessForm = this.fb.group({ 
            _name: ['',Validators.compose([
                Validators.required]),UniqueBusinessValidators.businessExists(this._businessService,this.id)],
           //_address: ['',Validators.required],
           _createdBy: [''],
           _address: [''],
            _city: ['',Validators.required],
            _address2:[''],_address3:[''],
            _country:[],
            _state:['',Validators.required],
            _zip:[],
            _phoneNumber:[''],
            _designatorCode:[''],
            _certificateNumber:[''],
            _certificateHoldingOffice:[''],
            _category:[''],
            _overview: [''],
            _capabilities: [''],
            _businessType: ['',Validators.required],
            _website:[''],
            _adImageWebsite:['']
         });
        // alert(this.business.id)
        if(Number.isInteger(this.id)){
            this.business.id = this.id
        this.getBusinessById(this.business.id);
        this.mapBusinessIdRefresh()
        }
        else{
            this.id = 0;
        }
                    });
                    
        this.getStates();
        this.getCountry();
        // this.getCategory();
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'category',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter:false
        };
//         this.mapsAPILoader.load().then(() => {
//             let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, {
//               types: ["address"]
//             });
//             autocomplete.addListener("place_changed", () => {
//               this.ngZone.run(() => {
//                 //get the place result
//                 let place: google.maps.places.PlaceResult = autocomplete.getPlace();
      
//                 //verify result
//                 if (place.geometry === undefined || place.geometry === null) {
//                   return;
//                 }
//                console.log("json    "+JSON.stringify(place))
//                console.log(place.formatted_address)
// this.business.address = place.formatted_address;
//                let splitString = place.formatted_address
//                let x = splitString.split(",")
//                let last = x.length;
//                var value = last - 1;
//                 this.business.country =  x[value];
//                 //set latitude, longitude and zoom
//                 // this.latitude = place.geometry.location.lat();
//                 // this.longitude = place.geometry.location.lng();
//                 // this.zoom = 12;
//               });
//             });
//           });
    }
    changeCustomerType(){
       // alert(1)
    }
    getUserId(){
        this.userId = this._sessionStorageService.getObject("userId");
        if(this.userId == null)
        this.userId = 0;
        this.roleId = this._sessionStorageService.getObject("roleId")
        if(this.roleId == null || this.roleId == 0)
        this.roleId = 5;
    }
    getBusinessById(id){
        // alert(id)
        var request = {
            id:id
        }
        this._businessService.getBusinessById(request).then(res => this.cb_getBusinessById(res));
    }
    cb_getBusinessById(res){
        this.business = res.business;
      
        //     this.isExistingFileAvailable = true;
        //     let fileDoc = this.business.capabilities;
        //     this.uploadFileName = fileDoc.split("/")
        //     console.log( this.uploadFileName[ this.uploadFileName.length-1]);
        //     this.fileName = this.uploadFileName[ this.uploadFileName.length-1];
        // }
        // else
            this.isExistingFileAvailable = true;
        if(this.business.adImageUrl != null){
            this.isExistingAdImageAvailable = true;
            this.showButton = true;
        }
        // this.selectedItems = res.category;
        if(this.business.active == 0)
            this.isActive = true;
        this.getCapability()
        
    }
    
    getCapability(){
        this._restApiService.getById('/business/getCapability', this.business.id).then(res => this.cb_getCapability(res))
    }
    cb_getCapability(res){
        this.capabilityList = res.capabilities;
        this.partsList = res.parts;
      //  for(let x of this.capabilityList){
       //     this.capability.push(x.fileName)
      //  }
       
      //  for(let x of this.partsList){
       //     this.parts.push(x.fileName)
      //  }
        this.noOfCapabilityFiles = this.capabilityList.length
        this.noOfPartsFiles = this.partsList.length
    }
    keyPress(event: any) {
        const pattern = /[0-9\+\-\ ]/;
    
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
          event.preventDefault();
        }
    }
    getCountry(){
        this._restApiService.get('/address/getCountry').then(res => this.cb_getCountry(res))
    }
    cb_getCountry(res){
        this.country = res.country;
    }
    getCategory(){
        this._restApiService.get('/business/getCategory').then(res => this.cb_getCategory(res))
    }
    cb_getCategory(res){
        this.category = res.category;
        // alert(JSON.stringify(this.category))
    }
    getStates(){
        this._restApiService.get('/address/getStates').then(res => this.cb_getStates(res))
    }
    cb_getStates(res){
        this.states = res.states;
    }
    stateChanged(country){
        if(country == "United States"){
            this.isStateManual = false;
        }
        else
            this.isStateManual = true;
    }
    addBusiness(){
        // if(this.isActive)
        //     this.business.active = 1;
        // else
        //     this.business.active = 0;
        if(this.business.id == 0 && this.business.createdBy == "Customer" )
            this.redirectToBusiness = true
        if(this.business.address==null){
            this.business.address='';
        }
        if(this.business.id == 0)
            this.business.createdId = this.userId
        var request;
        if(this.business.id == 0){
            request = {
                business:this.business,
                // category:this.selectedItems,
                // deleteCategory: this.deleteItems,
                capabilities: this.capability,
                parts:this.parts,
                userId:this.userId,
                roleId:this.roleId
            }
        }
        else{
          /*  this.capability.forEach(value => {
                console.log(value)
                for(let x of this.capabilityList){
                   
                    if(x.fileName == value){
                        console.log("x value "+x.fileName)
                        var index = this.capability.indexOf(value);
                        console.log(index)
                        this.capability.splice(index,1);
                    }
                }
            })*/
            // for(let x of this.capability){
            //     for(let y of this.capabilityList){
            //         console.log("x "+x+" y "+y.fileName)
            //         if(x == y.fileName){
            //             var index = this.capability.indexOf(x);
            //             this.capability.splice(index,1)
            //         }
            //     }
            // }
          /*  for(let x of this.parts){
                console.log("parts ",x)
                for(let y of this.partsList){
                    if(x == y.fileName){
                        var index = this.parts.indexOf(x);
                        this.parts.splice(index,1);
                    }
                }
            }*/
           
            request = {
                business:this.business,
                // category:this.selectedItems,
                // deleteCategory: this.deleteItems,
                capabilities: this.capability,
                parts:this.parts,
                userId:this.userId,
                roleId:this.roleId
            }
        }
      
        if(this.id == 0 && this.business.createdBy == "Customer" || this.id == 0 && this.business.createdBy == "Owner" ){
            this._businessService.addUpdateBusiness(request).then(res => this.cb_addUpdateBusiness(res))
        }
        else if(this.business.id != 0 ){
            this._businessService.addUpdateBusiness(request).then(res => this.cb_updateBusiness(res))
        }
       

    }
    cb_updateBusiness(res){
        if(res.isSuccess){
            console.log(res)
            this.isActive = false;
            this.businessName = this.business.name
            this.businessForm.reset();
            $('#successModal').modal('toggle');
        }
    }
    cb_addUpdateBusiness(res){
        if(res.isSuccess){
            console.log(res)
            this.isActive = false;
            this.businessName = this.business.name
            this.id = res.id
           // alert(this.business.createdBy)

            
            if(this.business.createdBy== "Customer"){
               // alert(9);
                this.successReviewMessage="How ever you can leave the review about the business now. It will be shown to users once the business is approved.";
            }
            this.businessForm.reset();

            $('#saveModal').modal('toggle');
            
               AlertService.getInstance().publishMessage('success','Business added successfully..')
        }
    }
    modalUpdate(){
        $('#successModal').modal('toggle');
        this._router.navigate(['dashboard/review/',this.business.id,this.businessName]);
        
    }
    modalSave(){
        // $('#saveModal').modal('toggle');
        if(this.redirectToBusiness)
            this._router.navigate(['dashboard/review/',this.id,this.businessName]);
        else
            this._location.back();
        console.log("back")
    }
    mapAlertService(){
        SessionDataService.getInstance().alertService(""+"1");
    }
    onItemSelect(item:any){
        console.log(item);
        for(let x of this.selectedItems){
            for(let y of this.deleteItems){
                 if(x.id == y.id){
                    this.deleteItems.splice(this.deleteItems.indexOf(y))
                    console.log("index value ",this.deleteItems)
                 }
                }
            }
    
    }
    OnItemDeSelect(item:any){
        this.deleteItems.push(item);
        
        console.log("delete : "+JSON.stringify(this.deleteItems))
    }
    onSelectAll(items: any){
        console.log(items);
        for(let x of this.selectedItems){
            for(let y of this.deleteItems){
                 if(x.id == y.id){
                    this.deleteItems.splice(this.deleteItems.indexOf(y))
                    console.log("index value ",this.deleteItems)
                 }
                }
            }
    }
    onDeSelectAll(items: any){
        console.log(items);
    }
    editParts(){
        this.isExistingPartsAvailable = !this.isExistingPartsAvailable;
        if(this.isExistingPartsAvailable){
            this.EditPartsButtonLabel="Edit"
        }
        else{
            this.EditPartsButtonLabel="Cancel"
        }
    }
    editPicture(){
        this.isExistingImageAvailable=!this.isExistingImageAvailable;
        if(this.isExistingImageAvailable){
          this.EditPictureButtonLabel="Edit"
        }else{
          this.EditPictureButtonLabel="Cancel"
        }
       
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
    uploadComplete(event){
       this.business.imageUrl = event.uploadedURL
          this.EditPictureButtonLabel="Edit"
    }
    adUpload(event){
        this.business.adImageUrl = event.uploadedURL
        this.showButton = true
        this.adButton = "Edit"
    }
    fileUploadComplete(event){
        if(event.uploadedURL!=null){
          this.capability.push(event.uploadedURL)
          this.noOfCapabilityFiles += this.capability.length
        //  alert(this.capability.length+"->"+event.uploadedURL)
         // alert(h)
        }
       
        
    }
    partsFileUpload(event){
        if(event.uploadedURL!=null){
            this.parts.push(event.uploadedURL)
            this.noOfPartsFiles += this.parts.length
        }
       // alert(JSON.stringify(this.parts))
    }
    mapBusinessIdRefresh(){
        SessionDataService.getInstance().businessIdRefresh(""+this.id);
    }
    cancel(){
        this._location.back();
    }
    mailToClient(){
        this._router.navigate(['business/mail']);
    }
    onChange(value){
        var request = {
            name:value,
            page:1,
            category:"",
            country:"",
            roleId:this.roleId
        }
          this._businessService.searchBusiness(request).then(res => this.cb_searchBusiness(res))
    }
    
    cb_searchBusiness(res){
         this.options = res.business;
    }
    moreOptions(){
        // alert(this.categoryValue)
        this.trigger.closePanel();
    }
    callSomeFunction(name){
        this.business.name = name;
    }
    editFile(){
        this.fileName = "";
        this.isExistingFileAvailable = !this.isExistingFileAvailable ;
        if(this.isExistingFileAvailable == false){
            this.fileName = "";
        }
    }
}