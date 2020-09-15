import {Component, OnInit, OnDestroy, ElementRef, Input, Injector, ViewChild} from '@angular/core';
import {NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute, RouterModule} from '@angular/router';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import {BaseComponent} from '../../common/basic/com.common.basic.basecomponent';
import {RestApiService} from '../../common/service/restapi/com.common.service.restapiservice';
import {SessionStorageService} from '../../common/service/com.common.sessionstorage';
import {BusinessService} from '../../service/com.service.business';

import {Business, BusinessRatingSummary, BusinessClaimMapping} from '../model/com.model.business';
import {Rating, Reviews, Bookmark} from '../model/com.model.ratingReview';
import {ReviewService} from '../../service/com.serivce.review';
import {SessionDataService} from '../../common/service/com.common.sessiondata';
import {CookieService} from 'ngx-cookie-service';
import {AlertService} from '../../common/service/alert/com.common.service.alertservice';

declare var $: any;

@Component({
  selector: 'review',
  templateUrl: 'com.mainmodules.review.html',
  styleUrls: ['com.mainmodules.review.css'],
  providers: [RestApiService, BusinessService, ReviewService, SessionDataService]
})
export class ReviewComponent extends BaseComponent {
  id: number;
  subscription;
  roleId: number = 5;
  business = new Business();
  ratingValue: any;
  reviewList: any = [];
  reviewValue: any;
  businessClaim = new BusinessClaimMapping;
  category: any;
  pricing: number;
  ipAddress: string;
  isClaimed: boolean = true;
  isApproved: boolean = false;
  userId: number = 0;
  moreEdit: boolean = false;
  rating = new Rating();
  review = new Reviews();
  bookmark = new Bookmark();
  ratingSummary = new BusinessRatingSummary();
  isModalLogin: boolean = false;
  isReviewOpen: boolean = false;
  reviewListOpen: boolean = true;
  ratingForm: FormGroup;
  speedAvg: number;
  isMarked: boolean = false;
  isPending: boolean = false;
  limitValue: string = '';
  capabilityList: any;
  partsList: any;
  uploadFileName: string[];
  fileName: string;
  createdDate = new Date();
  isLoading = true;

  // TODO - Show Loading Indicator
  // showLoadIndicator = true;

  constructor(injector: Injector, private _router: Router,
              private elRef: ElementRef, private cookieService: CookieService,
              private _location: Location,
              private _route: ActivatedRoute,
              private _restApiService: RestApiService,
              private _businessService: BusinessService,
              private _ratingService: ReviewService, private fb: FormBuilder) {
    super(injector);

    this.ratingForm = this.fb.group({
      _rating: ['', Validators.required],
      _reviewValue: [''],
      _recommendations: ['', Validators.required],
      _pricerating: [''],
      _speedrating: ['']
    });

  }

  ngOnInit() {
    this.subscription = this._route.params.subscribe(params => {
      // TODO - Show Loading Indicator
      // this.showLoadIndicator = true;
      this.reviewList = [];
      this.id = +params['id1'];
      var name = +params['id2'];
      window.scrollTo(0, 0);
      this.getBusinessById(this.id);
      $('#tab3Content').hide();
      this.getUserId();

      this.ipAddress = this._sessionStorageService.getObject('ipAddress');
      this.getInit();
      this.addEventLog(this.id, 'Search');
      this.getBookmark(this.id);
      this.getReviews();
      this.mapWishListResponse();
    });
    SessionDataService.getInstance().refresh$.subscribe(value => {
      this.getUserId();
      this.getInit();
      this.getBusinessById(this.id);
    });
    SessionDataService.getInstance().favoriteRefresh$.subscribe(value => {
      this.getBookmark(this.id);
    });
    SessionDataService.getInstance().alertMessage$.subscribe(value => {
      AlertService.getInstance().publishMessage('success', 'Business updated!:' + '..');
    });

  }

  getInit() {
    this.isPending = false;
    this.moreEdit = false;
    this.isClaimed = true;
  }

  getUserId() {
    this.userId = this._sessionStorageService.getObject('userId');
    if (this.userId == null)
      this.userId = 0;
    this.roleId = this._sessionStorageService.getObject('roleId');
    if (this.roleId == null || this.roleId == 0)
      this.roleId = 5;
  }

  mapLimitResponse() {
    if (this.limitValue == '1') {
      $('#exceedModal').modal('toggle');
    }
  }

  getBusinessById(id) {
    this.mapShowingAd();
    const request = {
      id: id
    };
    this._businessService.getBusinessById(request).then(res => this.cb_getBusiness(res));
  }

  addEventLog(id, value) {
    const request = {
      userId: this.userId,
      event: value,
      businessId: id,
      uniqueId: this.cookieService.get('Test'),
      ipAddress: this.ipAddress
    };
    this._ratingService.addEvent(request).then(res => console.log(res));
  }

  getBookmark(id) {
    const request = {
      userId: this.userId,
      businessId: id
    };
    this._ratingService.getBookmark(request).then(res => this.cb_getBookmark(res));
  }

  getReviews() {
    this._restApiService.getById('/rating/getReviewByBusiness', this.id).then(res => this.cb_getReviews(res));
  }

  cb_getReviews(res) {
    this.reviewList = res.reviewList;
    this.mapWishListResponse();
    this.mapShowingAd();

    // TODO - Show Loading Indicator
    /*let self = this;
    setTimeout(() => {
      self.showLoadIndicator = false;
    }, 800);
    */
  }

  cb_getBusiness(res) {
    this.businessClaim = res.businessClaim;
    this.business = res.business;
    this.category = res.businessCategory;

    if (res.businessRating != null) {
      this.ratingSummary = res.businessRating;
    } else {
      this.ratingSummary = new BusinessRatingSummary();
    }

    if (this.businessClaim != null) {
      if (this.businessClaim.approval === 1 && this.userId !== 0) {

        this.isApproved = true;
      } else {
        this.isApproved = false;
      }
      if (this.userId === this.businessClaim.userId && this.businessClaim.approval === 0) {
        this.isPending = true;
      }
      if (this.userId === this.business.userId && this.businessClaim.approval === 1) {
        this.moreEdit = true;
      }

    } else {
      if (this.userId !== 0 && this.roleId > 3) {
        this.isClaimed = false;
      } else {
        this.isClaimed = true;
      }
      this.isPending = false;
      this.isApproved = false;
    }
    this.getCapability();
    this.isLoading = false;
  }

  getCapability() {
    this._restApiService.getById('/business/getCapability', this.id).then(res => this.cb_getCapability(res));
  }

  cb_getCapability(res) {
    this.capabilityList = res.capabilities;
    this.partsList = res.parts;
  }

  cb_getBookmark(res) {

    if (res.isSuccess) {
      this.bookmark = res.bookmark;
      if (res.bookmark == null) {
        this.isMarked = false;
      }
      if (this.bookmark != null) {
        if (this.bookmark.marked != null) {
          this.isMarked = this.bookmark.marked;
        }
      }
    } else {
      this.isMarked = false;
    }
  }

  addBookmark() {
    this.userId = this._sessionStorageService.getObject('userId');
    let deleteOne = 0;
    if (this.isMarked) {
      deleteOne = 1;
    }
    const request = {
      userId: this.userId,
      businessId: this.id,
      deleteOne: deleteOne
    };
    if (this.userId !== 0 && this.userId != null) {
      this._ratingService.addBookmark(request).then(res => this.cb_updateBookmark(res));
    } else {
      this.getLogin();
    }
  }

  cb_updateBookmark(res) {
    if (res.isSuccess) {
      if (res.deleted === 'deleted') {
        this.isMarked = false;
      } else {
        this.isMarked = true;
      }
      this.mapFavoriteRefresh();
    }
  }

  addReview() {
    this.userId = this._sessionStorageService.getObject('userId');
    this.review.businessId = this.id;
    this.review.review = this.reviewValue;
    this.review.ratingId = this.ratingValue;
    this.review.userId = this.userId;
    const request = {
      rating: this.rating,
      review: this.review
    };

    if (this.userId !== 0 && this.userId != null) {
      this._ratingService.addRating(request).then(res => this.cb_addReview(res));
    } else {
      this.getLogin();
    }

  }

  cb_addReview(res) {
    if (res.isSuccess) {
      this.ratingForm.reset();
      //    this.checkValue();
      this.getBusinessById(this.id);
      this.addEventLog(this.id, 'Review');
    }
    this.mapWishListResponse();
  }

  reviewListTab(value) {
    if (value === 1) {
      this.reviewListOpen = true;
    } else {
      this.reviewListOpen = false;
    }
    if (value === 2) {
      $('#tab2Content').show();
    } else {
      $('#tab2Content').hide();
    }
    if (value === 3) {
      $('#tab3Content').show();
    }else {
      $('#tab3Content').hide();
    }
     
  }

  checkForReview() {
    this.userId = this._sessionStorageService.getObject('userId');
    this.review.businessId = this.id;
    this.review.userId = this.userId;
    const request = {
      review: this.review,
      date: this.createdDate
    };
    this._ratingService.checkForReview(request).then(res => this.cb_checkForReview(res));
  }

  cb_checkForReview(res) {
    if (res.isSuccess) {
      this.isReviewOpen = true;
    } else {
      $('#exceedModal').modal('toggle');
    }
  }

  refreshEvent(event) {
    if (event === 1) {
      this.getBusinessById(this.id);
      this.getReviews();
      this.isReviewOpen = false;
    }
  }

  claimBusiness() {
    $('#claimed').modal('toggle');
    $('#claimApproved').modal('toggle');
    const request = {
      userId: this.userId,
      businessId: this.id
    };
    this._ratingService.claimBusiness(request).then(res => this.cb_claimBusiness(res));
  }

  cb_claimBusiness(res) {
    if (res.isSuccess) {
      $('#claimApproved').modal('toggle');
      this.isClaimed = true;
      this.businessClaim = res.claimBusiness;
      if (this.userId == this.businessClaim.userId && this.businessClaim.approval == 0) {
        this.isPending = true;
      }
      if (this.businessClaim.userId == this.userId && this.businessClaim.approval == 1) {
        this.moreEdit = true;
        this.mapClaimBusiness();
      }
    }
  }

  getLogin() {
    $('.signUpTab').hide();
    $('.loginTab').show();
    $('#login').addClass('new-tab');
    $('#signUp').removeClass('new-tab');
    $('#loginModal').modal('toggle');
  }

  mapWishListResponse() {
    SessionDataService.getInstance().updateWishListActive('' + this.id);
  }

  mapFavoriteRefresh() {
    SessionDataService.getInstance().refreshFavorite('' + '1');
  }

  mapShowingAd() {
    SessionDataService.getInstance().showCurrentAd('' + this.id);
  }

  mapClaimBusiness() {
    // SessionDataService.getInstance().claimForBusiness(""+this.businessClaim.userId);
    this._sessionStorageService.setObject('moreOption', this.businessClaim.userId);
  }

  checkValue() {
    return this.id;
  }

  cancelModal() {
    this.isModalLogin = false;
  }

  reviewTab() {
    if (this.userId != 0 && this.userId != null) {
      this.checkForReview();
    } else {
      this.getLogin();
    }
  }
  contact(){
    this._router.navigate(['dashboard/contact'], {
      queryParams: {
        business: this.business.id,
      }
    });
  }

  editBusiness(isClaimBusiness) {
    // if (this.businessClaim != null) {
    //   this.mapClaimBusiness();
    // }
    var redirectURL = 'business/edit_business';
    if(isClaimBusiness){
     this.popup();
      this._sessionStorageService.setObject('claimBusinessClicked', true);
      //redirectURL += '?claimBusiness=true'
    }
  this._router.navigate([redirectURL, this.id]);
  // this._router.navigate([redirectURL], { queryParams: { id: this.id } });
  }

contactform(){
  this._router.navigate(['dashboard/contact']);
  
  }

  popup(){
    $('#claimed').modal('toggle');
  }

  downloadFile(id) {
    this._businessService.downloadFile(id, 'Capabilities');
  }

  downloadPartsFile(id) {
    this._businessService.downloadFile(id, 'Parts');
  }

  deleteCapability(id) {
    const request = {
      id: id
    };
    this._businessService.deleteCapabilities(request).then(res => this.cb_getDeleted(res));
  }

  deleteParts(id) {
    var request = {
      id: id
    };
    this._businessService.deleteParts(request).then(res => this.cb_getDeleted(res));
  }

  cb_getDeleted(res) {
    this.getCapability();
  }
}
