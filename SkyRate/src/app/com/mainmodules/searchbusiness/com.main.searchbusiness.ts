import {Component, Injector, Output, EventEmitter, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {map} from 'rxjs/operators/map';
import {ActivatedRoute} from '@angular/router';
import {MatAutocompleteTrigger} from '@angular/material';
import {BusinessService} from '../../service/com.service.business';
import {FormComponent} from '../../common/basic/com.common.basic.formcomponent';
import {SessionDataService} from '../../common/service/com.common.sessiondata';
import {RestApiService} from '../../common/service/restapi/com.common.service.restapiservice';
import {ReviewService} from '../../service/com.serivce.review';


declare var $: any;

@Component({
  selector: 'search',
  templateUrl: 'com.main.searchbusiness.html',
  styleUrls: ['com.main.searchbusiness.css'],
  providers: [BusinessService, SessionDataService, RestApiService, ReviewService]
})
export class SearchBusinessComponent extends FormComponent {
  @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;
  @Output()
  stringChanged = new EventEmitter();
  category: any;
  options: any;
  country: any;
  favoriteList: any;
  categoryValue: number = 1;
  countryValue: string = '';
  businessId: number;
  selectedBuiness: string = '';
  optionValue: string = '';
  sessionValue: string = '';
  enableCompare: boolean = false;
  roleId: number = 0;
  userId: number;
  businessSearchControl = new FormControl();
  lastSearch:string='';
  searchEventInProgress:boolean=false;
  constructor(injector: Injector,
              private _restApiService: RestApiService,
              private _businessService: BusinessService,
              private _ratingService: ReviewService,
              private _route: ActivatedRoute,
  ) {
    super(injector);
    this.roleId = this._sessionStorageService.getObject('roleId');
    this.userId = this._sessionStorageService.getObject('userId');

    SessionDataService.getInstance().totalCartItemCount$.subscribe(value => {
      this.sessionValue = value;
      this.selectedBuiness = this.sessionValue;
    });
    SessionDataService.getInstance().refresh$.subscribe(value => {
      this.userId = this._sessionStorageService.getObject('userId');
    });

    if (this._router.url == '/business/compare') {
      this.enableCompare = true;
    }
    this.getSearchBusiness();
  }

  getSearchBusiness() {
    var request = {
      name: '',
      category: this.categoryValue,
      page: 1,
      roleId: this.roleId
    };
    this._businessService.searchBusiness(request).then(res => this.cb_searchBusiness(res));
  }

  ngOnInit() {
    this.selectedBuiness = this.sessionValue;
    // this.getCategory();
   var category = this._route.snapshot.queryParamMap.get('category');
   if(category == null)
    this.categoryValue = 1;
    // alert(this.categoryValue)
   this.categoryValue =+category;
   // this.getCountry();
  }

  ngAfterViewInit() {
    // Clear the input and emit when a selection is made
    this.trigger.autocomplete.optionSelected
      .map(event => event.option)
      .subscribe(option => {
        this.selectedBuiness = option.value;
        this.businessSearchControl.setValue('');
      });
  }

  getCountry() {
    this._restApiService.get('/address/getCountryList').then(res => this.cb_getCountry(res));
  }

  cb_getCountry(res) {
    this.country = res.country;
  }

  getCategory() {
    this._restApiService.get('/business/getCategory').then(res => this.cb_getCategory(res));
  }

  cb_getCategory(res) {
    this.category = res.category;
    // alert(JSON.stringify(this.category))
  }

  showSearchPanel(categoryValue) {
    this.trigger.openPanel();
  }

  compare(id) {
    this.trigger.closePanel();
    var request = {
      userId: this.userId,
      businessId: id
    };
    this._ratingService.addBookmark(request).then(res => this.cb_updateBookmark(res));
  }

  cb_updateBookmark(res) {
    this.mapFavoriteRefresh();
  }

  mapFavoriteRefresh() {
    SessionDataService.getInstance().refreshFavorite('' + '1');
  }

  moreOptions(name) {
    this.searchEventInProgress=true;
    this.businessSearchControl.setValue('');
     // alert(name)
     // this.selectedBuiness=name;
    // alert(name)
     if(name!=''){
     this.lastSearch=name;
     }
    $('#searchbox').blur();
    this.trigger.closePanel();
    this.mapCategoryValue();
    this.mapWishListResponse();
    this.mapCountryValue();

    if (!this.businessId) {
      this._router.navigate(['dashboard/search-list/'], {
        queryParams: {
          search: this.lastSearch,
          country: this.countryValue,
          category: this.categoryValue
        }
      });
    } else {
      this._router.navigate(['dashboard/review/', this.businessId, this.selectedBuiness]);
      this.businessId = null;
    }
    this.searchEventInProgress=false;
  }

  onCountryChange() {
    this.getSearchBusiness();
  }

  onSelectChange(value) {
    this.categoryValue = value;
    this.getSearchBusiness();
    //  alert("onSelectChange")
  //  this.categoryValue = value;
   // this.selectedBuiness = '';
  //  this.mapCategoryValue();
   // this.mapWishListResponse();
   // this.getSearchBusiness();
  }

  onChange(value) {
    if(this.searchEventInProgress)
    return
   // alert("onChange")

    this.lastSearch=value;
    this.businessId = null;
    const request = {
      name: value,
      country: this.countryValue,
      category: this.categoryValue,
      page: 1,
      roleId: this.roleId,
      createdId: this.userId
    };
    this._businessService.searchBusiness(request).then(res => this.cb_searchBusiness(res));
  }

  cb_searchBusiness(res) {
    this.options = res.business;
  }

  callSomeFunction(_event: any, value, name) {
   // alert('callSomeFunction')
    if (!_event.isUserInput) {
      return;
    }
    //alert(this.selectedBuiness)
    // this.selectedBuiness=""
    // alert($('#searchbox').val());
    // alert(value)
    this.selectedBuiness = name.trim();
    this.businessId = value;
    this.mapWishListResponse();
    this._router.navigate(['dashboard/review/', this.businessId, this.selectedBuiness]);
  }

  mapWishListResponse() {
    SessionDataService.getInstance().updateTotalCartItemsCount('' + this.selectedBuiness);
  }

  mapCountryValue() {
    SessionDataService.getInstance().countryValueMethod('' + this.countryValue);
  }

  mapCategoryValue() {
    SessionDataService.getInstance().categoryValueMethod('' + this.categoryValue);
  }

  newBusiness() {
    this._router.navigate(['business/update_business']);
  }

  public displayNull() {
    return null;
  }


}
