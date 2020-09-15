import {Component, Injector} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {BusinessService} from '../../service/com.service.business';
import {BaseComponent} from '../../common/basic/com.common.basic.basecomponent';
import {RestApiService} from '../../common/service/restapi/com.common.service.restapiservice';
import {SessionDataService} from '../../common/service/com.common.sessiondata';
import {ReviewService} from '../../service/com.serivce.review';
import {AuthValidatorProvider} from '../../common/service/com.service.authvalidator';

declare var $: any;

@Component({
  selector: 'right-side',
  templateUrl: 'com.main.rightSidePanel.html',
  styleUrls: ['com.main.rightSidePanel.css'],
  providers: [BusinessService, RestApiService, SessionDataService, ReviewService, AuthValidatorProvider]
})
export class RightSideComponent extends BaseComponent {

  userId: number;
  favoriteList: any;

  constructor(injector: Injector,
              private _router: Router,
              private _restApiService: RestApiService,
              private _businessService: BusinessService,
              private _reviewService: ReviewService,
              private _authValidatorProvider: AuthValidatorProvider,
              private _route: ActivatedRoute) {
    super(injector);


    this.getUserId();

    if (this.userId !== 0) {
      this.getFavorite();
    }

    SessionDataService.getInstance().refresh$.subscribe(value => {
      this.getUserId();
      this.getFavorite();
    });
    SessionDataService.getInstance().favoriteRefresh$.subscribe(value => {
      this.getFavorite();
    });
  }

  getUserId() {
    const userId = this._sessionStorageService.getObject('userId');
    this.userId = userId ? userId : 0;
  }

  addBusiness() {
    if (this.userId != 0)
      this._router.navigate(['business/update_business']);
    else {
      this.loginModal();
    }
  }

  getStyles() {
    var styles;
    if (this.userId != 0) {
      styles = {
        'margin-top': '10px'
      };
    }
    else {
      styles = {
        'margin-top': '50px'
      };
    }
    return styles;
  }

  getFavorite() {
    this._restApiService.getById('/business/getFavorite', this.userId).then(res => this.cb_getFavorite(res));
  }

  cb_getFavorite(res) {

    this.favoriteList = res.bookmark;
    console.log('bookmar response : ', this.favoriteList);
  }

  reviewBusiness(id, name) {
    this._router.navigate(['dashboard/review/' + id, name]);
  }

  contact() {
    this._router.navigate(['dashboard/contact']);
  }

  moveToFavorite() {
    this.mapFavoriteRefresh();
    if (this.userId != 0)
      this._router.navigate(['business/compare']);
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

  mapFavoriteRefresh() {
    SessionDataService.getInstance().refreshFavorite('' + '1');
  }

  mapBookmarkRefresh() {
    SessionDataService.getInstance().addbookMarkRefresh('' + '1');
  }

  addBookmark(id, deleteAll) {
    this.userId = this._sessionStorageService.getObject('userId');
    var request = {
      userId: this.userId,
      businessId: id,
      deleteAll: deleteAll
    };
    this._reviewService.addBookmark(request).then(res => this.cb_updateBookmark(res));
  }

  deleteBookmark(id, deleteAll) {
    this.userId = this._sessionStorageService.getObject('userId');
    var request = {
      userId: this.userId,
      businessId: id,
      deleteOne: 1
    };
    this._reviewService.addBookmark(request).then(res => this.cb_updateBookmark(res));
  }

  cb_updateBookmark(res) {
    if (res.isSuccess) {
      this.getFavorite();
      this.mapBookmarkRefresh();
    }
  }
}
