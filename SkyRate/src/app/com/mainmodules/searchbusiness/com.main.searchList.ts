import {Component, Injector} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {BusinessService} from '../../service/com.service.business';
import {BaseComponent} from '../../common/basic/com.common.basic.basecomponent';

import {FormComponent} from '../../common/basic/com.common.basic.formcomponent';
import {SessionDataService} from '../../common/service/com.common.sessiondata';
import {SessionStorageService} from '../../common/service/com.common.sessionstorage';
import {ReviewService} from '../../service/com.serivce.review';
import {RestApiService} from '../../common/service/restapi/com.common.service.restapiservice';

declare var $: any;

@Component({
  selector: 'search-list',
  templateUrl: 'com.main.searchList.html',
  styleUrls: ['../homepage/beforeSearch/com.beforeSearch.css'],
  providers: [BusinessService, SessionDataService, ReviewService, RestApiService]
})
export class SearchListComponent extends BaseComponent {
  subscription;
  searchList: any;
  searchValue: any;
  favoriteList: any;
  categoryValue: string = '';
  countryValue: string = '';
  name: any;
  id: string;
  count: number = 0;
  roleId: number = 0;
  userId: number = 0;
  currentPage: number = 0;
  lastPage: number;
  pageTotal: number;
  selectedIndex: number;

  constructor(injector: Injector,
              private _router: Router,
              private _businessService: BusinessService,
              private _restApiService: RestApiService,
              private _route: ActivatedRoute,
              private _ratingService: ReviewService,
  ) {
    super(injector);

  }

  ngOnInit() {
    this.subscription = this._route.queryParams.subscribe(queryParams => {
      this.loadSearch();
    });
  }

  loadSearch() {
    this.id = this._route.snapshot.queryParamMap.get('search');
    this.categoryValue = this._route.snapshot.queryParamMap.get('category');
    this.countryValue = this._route.snapshot.queryParamMap.get('country');
    window.scrollTo(0, 0);
    this.getUserId();
    this.updateFromParent(this.id);
  }

  getUserId() {
    this.userId = this._sessionStorageService.getObject('userId');
    if (this.userId == null)
      this.userId = 0;
    this.roleId = this._sessionStorageService.getObject('roleId');
    if (this.roleId == null || this.roleId == 0)
      this.roleId = 5;
  }

  getFavorite() {
    this._restApiService.getById('/business/getFavorite', this.userId).then(res => this.cb_getFavorite(res));
  }

  cb_getFavorite(res) {
    this.favoriteList = res.bookmark;
    if (res.isSuccess) {
      for (let x of this.searchList) {
        for (let y of res.bookmark) {
          if (x.id == y.businessId) {
            x.isBookmarked = true;
          }
        }
      }
    }
  }

  keyPress(event: any) {
    const pattern = /[0-9 ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  updateFromParent(value) {
    this.searchValue = value;
    var type =+this.categoryValue;
    const request = {
      name: this.searchValue,
      category: type,
      country: this.countryValue,
      roleId: this.roleId
    };
    this._businessService.searchBusiness(request).then(res => this.cb_searchBusiness(res));
  }

  updateFromChild(value) {
    this.searchValue = value;
    const request = {
      name: this.searchValue,
      category: this.categoryValue,
      country: this.countryValue,
      roleId: this.roleId
    };
    this._businessService.searchBusiness(request).then(res => this.cb_searchBusiness(res));

  }

  cb_searchBusiness(res) {
    if (res && res.count === 1) {
      const business = res.business[0];
      this._router.navigate(['dashboard/review/' + business.id, business.name]);
    } else {
      this.searchList = res.business;
      this.pageTotal = res.count / 10;
      this.currentPage = 1;
      this.count = this.searchList.length / 10;
      this.lastPage = Math.round(this.pageTotal);
      if (this.lastPage === 0) {
        this.lastPage = 1;
      }
      this.getFavorite();
    }
  }

  reviewBusiness(id, value) {
    this._router.navigate(['dashboard/review/' + id, value]);
  }

  cb_getBusiness(res) {
    window.scrollTo(0, 0);
    this.searchList = res.business;
    this.getFavorite();
  }

  compare(id, index) {
    this.selectedIndex = index;

    if (this.userId != 0) {
      var request = {
        userId: this.userId,
        businessId: id
      };
      this._ratingService.addBookmark(request).then(res => this.cb_updateBookmark(res));
    }
    else
      this.loginModal();
  }

  loginModal() {
    $('.signUpTab').hide();
    $('.loginTab').show();
    $('#login').addClass('new-tab');
    $('#signUp').removeClass('new-tab');
    $('#loginModal').modal('toggle');
  }

  cb_updateBookmark(res) {
    if (res.isSuccess) {
      this.searchList[this.selectedIndex].isBookmarked = true;
      this.mapFavoriteRefresh();
      this.getFavorite();
    } else {
      alert(res.userErrorMsg);
    }
  }

  mapFavoriteRefresh() {
    SessionDataService.getInstance().refreshFavorite('' + '1');
  }

  pagesearch(event) {
    // alert(this.currentPage)
    // this.currentPage = null;
    var request = {
      search: this.searchValue,
      value: event,
      category: this.categoryValue,
      roleId: this.roleId
    };
    console.log('previous value ' + this.currentPage);
    this._businessService.getBusinessPagination(request).then(res => this.cb_getBusiness(res));
  }

  start() {
    this.currentPage = 1;
    var request = {
      search: this.searchValue,
      value: this.currentPage,
      category: this.categoryValue,
      roleId: this.roleId
    };
    console.log('previous value ' + this.currentPage);
    this._businessService.getBusinessPagination(request).then(res => this.cb_getBusiness(res));

  }

  previous() {
    console.log('previous in current ' + this.currentPage);
    console.log('previous in last ' + this.lastPage);
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      var request = {
        search: this.searchValue,
        value: this.currentPage,
        category: this.categoryValue,
        roleId: this.roleId
      };
      this._businessService.getBusinessPagination(request).then(res => this.cb_getBusiness(res));
      console.log('previous value ' + this.currentPage);
    }
  }

  next() {

    if (this.lastPage > this.currentPage) {

      var page = +this.currentPage;
      page += 1;
      this.currentPage = page;

      var type = +this.categoryValue;
      var request = {
        search: this.searchValue,
        value: this.currentPage,
        category: type,
        roleId: this.roleId
      };
      console.log('page befoe send  ' + page);
      this._businessService.getBusinessPagination(request).then(res => this.cb_getBusiness(res));
    }
  }

  end() {
    this.currentPage = this.lastPage;
    var request = {
      search: this.searchValue,
      value: this.currentPage,
      category: this.categoryValue,
      roleId: this.roleId
    };
    this._businessService.getBusinessPagination(request).then(res => this.cb_getBusiness(res));
  }
}
