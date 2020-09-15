import {Component, Injector} from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router'

import { BusinessService } from '../../service/com.service.business';
import { BaseComponent } from '../../common/basic/com.common.basic.basecomponent';

import { FormComponent } from '../../common/basic/com.common.basic.formcomponent';
import { SessionDataService } from '../../common/service/com.common.sessiondata';
import { RestApiService } from '../../common/service/restapi/com.common.service.restapiservice';
declare var $:any;


@Component({
    selector:'popular-list',
    templateUrl:'com.main.popularList.html',
    styleUrls:['com.main.popularList.css'],
    providers:[BusinessService,SessionDataService,RestApiService]
})
export class PopularListComponent extends BaseComponent{
    subscription;
    searchList:any;
    searchValue:any;
    categoryValue:string="";
    name:any;
    userId:number;
    favoriteList:any;
    favoriteArray: number[]=[0];
    isChecked:boolean = false;
   
    constructor(injector:Injector,
        private _router : Router,
        private _businessService : BusinessService,
        private _restApiService : RestApiService,
        private _route : ActivatedRoute,
       ) {
        super(injector); 
       
    }

    ngOnInit(){
        this.categoryValue = this._route.snapshot.queryParamMap.get('category')
        // this.subscription= this._route.params.subscribe(params=>{
        //     var name = +params["id1"]
        // alert(name)
        //             });
        window.scrollTo(0, 0)
        this.getPopularSearch(this.categoryValue);
       if(this.categoryValue == "Favorite"){
            this.getUserId()
            this.getFavorite()
       }
       SessionDataService.getInstance().moveToFavorite$.subscribe(value =>{
        this.getUserId()
        this.categoryValue = "Favorite";
            this.getFavorite();
       });
       
    }
    getUserId(){
        this.userId = this._sessionStorageService.getObject("userId");
        if(this.userId == null)
        this.userId = 0;
    }
    getFavorite(){
        this._restApiService.getById("/business/getFavorite",this.userId).then(res => this.cb_getFavorite(res))
    }
    cb_getFavorite(res){
        
        this.favoriteList = res.bookmark;
        console.log("bookmar response : ",this.favoriteList)
    }
    getPopularSearch(value){
        var request = {
            category:value,
            enablePopular:1
        }
        this._businessService.getPopularSearch(request).then(res => this.cb_getPopularSearch(res))
    }
    cb_getPopularSearch(res){
        this.searchList = res.popularSearch
    }
    reviewBusiness(id,value){
        this._router.navigate(['dashboard/review/'+id,value]);
      // this._router.navigate(['dashboard/report']);
  }
  addToArray(value,isFavorite,index){
    
    var number = this.favoriteArray.indexOf(value)
    // alert("num "+number)
    if(number != -1)
          this.favoriteArray.splice(number,1)
    else{ 
        var arrayValue = 0;
            for(let x of this.favoriteArray){
                if(x != value){
                    arrayValue = value
                }
            }
            if(arrayValue != 0)
            this.favoriteArray.push(value);
        }  
       
    //  var   myList = [1,3,2,5,5,8]; Remove Duplicate from Array 
    //  var  myNewList =  Array.from(new Set(myList ));
    
        this._sessionStorageService.setObject("compareValue",this.favoriteArray)
            console.log("add value "+this.favoriteArray)
}

    compare(){
        // if(this.favoriteArray.length < 6)
        this._router.navigate(['business/compare']);
        // else
        //     $('#compareModal').modal('toggle');
    }


}