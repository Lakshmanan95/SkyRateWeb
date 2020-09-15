import {Component, Injector, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {BusinessService} from '../../service/com.service.business';
import {BaseComponent} from '../../common/basic/com.common.basic.basecomponent';
import {RestApiService} from '../../common/service/restapi/com.common.service.restapiservice';
import {ReviewService} from '../../service/com.serivce.review';
import {SessionDataService} from '../../common/service/com.common.sessiondata';

import {MatAutocompleteTrigger} from '@angular/material';
import {and} from '@angular/router/src/utils/collection';

declare var $: any;

@Component({
  selector: 'compare',
  templateUrl: 'com.main.compare.html',
  styleUrls: ['com.main.compare.css'],
  providers: [BusinessService, RestApiService, ReviewService, SessionDataService]
})
export class CompareBusinessComponent extends BaseComponent {

  lastSelectedBusiness: any;
  userId: number;
  compareList: any;
  compare1: any;
  comparableValue = [];
  idCollect = [];
  compareId: any;
  count: number = 0;
  columnSeperation: number = 4;
  options1: any;
  options2: any;
  options3: any;
  options4: any;
  search1: string;
  search2: string;
  search3: string;
  search4: string;
  fakeArray = new Array(4);
  @ViewChild(MatAutocompleteTrigger) trigger1: MatAutocompleteTrigger;
  @ViewChild(MatAutocompleteTrigger) trigger2: MatAutocompleteTrigger;
  @ViewChild(MatAutocompleteTrigger) trigger3: MatAutocompleteTrigger;
  @ViewChild(MatAutocompleteTrigger) trigger4: MatAutocompleteTrigger;

  //  @ViewChild(MatAutocompleteTrigger) trigger5: MatAutocompleteTrigger;
  constructor(injector: Injector,
              private _router: Router,
              private _restApiService: RestApiService,
              private _businessService: BusinessService,
              private _reviewService: ReviewService,
              private _route: ActivatedRoute) {
    super(injector);
    this.userId = this._sessionStorageService.getObject('userId');
    if (this.userId == null)
      this.userId = 0;
    this.getFavorite();
    SessionDataService.getInstance().favoriteRefresh$.subscribe(value => {
      this.getFavorite();
    });
  }

  ngOnInit() {
    // (this.trigger1 as any)._getHostWidth = () => '300px';
    //this.trigger1.set
    //  this.trigger1.updateSize({width: this.trigger1._getHostWidth()});
    // (this.trigger1 as any).updateSize({width: 300})
  }

  getFavorite() {
    this._restApiService.getById('/business/getFavorite', this.userId).then(res => this.cb_getFavorite(res));
  }

  cb_getFavorite(res) {
    this.compareList = res.bookmark;
    this.fakeArray = new Array(4 - this.compareList.length);
    console.log('favorite response:  ' + JSON.stringify(this.compareList));
    // this.compareId = this._sessionStorageService.getObject("compareValue")
    // for(let x of this.compareId){
    //     for(let y of this.compareList){
    //         if(x == y.businessId){
    //             this.comparableValue.push(y)
    //         }
    //     }
    // }
    console.log('comare res', JSON.stringify(this.comparableValue));
    //    this.getColumnSeperation()
  }

  // rowStyle(){
  //     this.count = this.compareList.length
  //     var styles;
  //     if(this.count > 5){
  //         styles = {
  //             'width':'1800px'
  //         }
  //     }
  //     else if(this.count > 3 ){
  //         styles = {
  //             'width':'1200px'
  //         }
  //     }
  //     else{
  //         styles = {
  //             'width': '1000px'
  //         }
  //     }
  //     return styles;
  // }
  // getColumnSeperation(){
  //     alert(this.compareList)
  //     if(this.comparableValue.length == 4){
  //         this.columnSeperation = 3
  //     }
  //     if(this.comparableValue.length == 2){
  //      this.columnSeperation = 5
  //      }
  // }

  /*ngAfterViewInit() {
      // Clear the input and emit when a selection is made
      this.trigger1.autocomplete.optionSelected
        .map(event => event.option)
        .subscribe(option => {
          this.options=null;
        });
    }*/
  onChange(value, selectedOption) {
    // alert("ol"+listValue)
    var request = {
      name: value,
      category: '',
      country: '',
      page: 1,
      roleId: 4
    };
    this._businessService.searchBusiness(request).then(res => this.cb_searchBusiness(res, selectedOption));
  }

  cb_searchBusiness(res, selectedOption) {
    if (selectedOption === 1) {
      this.options1 = res.business;
    }
    if (selectedOption === 2) {
      this.options2 = res.business;
    }
    if (selectedOption === 3) {
      this.options3 = res.business;
    }
    if (selectedOption === 4) {
      this.options4 = res.business;
    }
    $('.mat-autocomplete-panel').css({display: 'inline-block'});
  }

  moveToBusiness(id, name) {
    this._router.navigate(['dashboard/review/', id, name]);
  }

  compare(id, value) {

    var request = {
      userId: this.userId,
      businessId: id,

    };
    this._reviewService.addBookmark(request).then(res => this.cb_updateBookmark(res));
  }

  deleteBusiness(id, deleteAll,index) {
    /*for(let x of this.compareList){
         if(x.businessId == id){
         var indexValue = this.compareList.indexOf(x)
         this.compareList.splice(indexValue, 1)
         }
     }*/
    console.log('log ', this.compareList);
    // alert(index)
    this.clearSearch(index);
    this.userId = this._sessionStorageService.getObject('userId');
    var request = {
      userId: this.userId,
      businessId: id,
      deleteOne: 1,
      deleteAll: deleteAll
    };
    this._reviewService.addBookmark(request).then(res => this.cb_updateBookmark(res));
  }
  clearSearch(index){
    //alert(index)
   /*if(index==0){
      this.search1="";
      this.options1=null;
    }else if(index==1){
      this.search2="";
      this.options2=null;
    }else if(index==2){
      this.search3="";
      this.options3=null;
    }else if(index==3){
      this.search4="";
      this.options4=null;
    }*/
    this.search1="";
    this.search2="";
    this.search3="";
    this.search4="";
    this.options1=null;
    this.options2=null;
    this.options3=null;
    this.options4=null;
  }
  cb_updateBookmark(res) {
    if (res.isSuccess) {
      this.getFavorite();
      //  this.getFavorite();
    } else {
      alert(res.userErrorMsg);
    }
  }

  cb_updateBookmark2(res) {
    if (res.isSuccess) {
      //  this.getFavorite();
      this.getFavorite();
    } else {
      alert(res.userErrorMsg);
    }
  }

  headerStyle() {
    var styles;
    if (this.columnSeperation == 3) {
      styles = {
        'height': '200px'
      };
    }
    else {
      styles = {
        'height': '150px'
      };
    }
    return styles;
  }

  private doAction(_event: any, id: any) {
    alert(_event.isUserInput);
    if (_event.isUserInput) {
      //do something
      alert(id);
    }
  }

  callSomeFunction(_event: any, id, value) {
    //this.options=null;
    // alert(_event.isUserInput)
    if (!_event.isUserInput) {
      return;
    }
    // alert(id);
    //  if(this.lastSelectedBusiness!=null && this.lastSelectedBusiness==id)
    //  return;
    var request = {
      userId: this.userId,
      businessId: id
    };
    this._reviewService.addBookmark(request).then(res => this.cb_updateBookmark2(res));

    /*  if(value == 0){
          this.search1 = ""
          $('#searchbox1').blur()
      }

      if(value == 1){
          this.search2 = ""
          $('#searchbox2').blur()
      }
      if(value == 2){
          this.search3 = ""
          $('#searchbox3').blur()
      }
      if(value == 3){
          this.search4 = ""
          $('#searchbox4').blur()
      }*/

    // if(this.compareList.length >= 0){
    //     for(let x of this.compareList){
    //         for(let y of this.options){

    //             if(x.businessId != y.id){
    //                 if(y.id == id){
    //                     this.compareList.push(y)
    //                 }
    //             }
    //         }
    //     }
    // }
    // else{

    //     for(let x of this.options){
    //         if(x.id == id)
    //         this.compareList.push(x)
    //     }
    // }
    console.log(this.compareList);
    //   this.compare(id,value);
  }

  // deleteBusiness(value){
  //     this.comparableValue.splice(value, 1);
  //     // this.getColumnSeperation()
  // }
}
