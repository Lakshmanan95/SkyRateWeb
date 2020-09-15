import {Component, OnInit, OnDestroy, ElementRef, Output, EventEmitter, Input, Injector} from '@angular/core';
import {NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute, RouterModule} from '@angular/router';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import {BaseComponent} from '../../common/basic/com.common.basic.basecomponent';
import {RestApiService} from '../../common/service/restapi/com.common.service.restapiservice';
import {SessionStorageService} from '../../common/service/com.common.sessionstorage';
import {BusinessService} from '../../service/com.service.business';

import {Business, BusinessRatingSummary} from '../model/com.model.business';
import {Rating, Reviews} from '../model/com.model.ratingReview';
import {ReviewService} from '../../service/com.serivce.review';
import {SessionDataService} from '../../common/service/com.common.sessiondata';
import {AlertService} from '../../common/service/alert/com.common.service.alertservice';
import {Session} from 'selenium-webdriver';

declare var $: any;

@Component({
  selector: 'review-list',
  templateUrl: 'com.mainmodules.reviewList.html',
  styleUrls: ['com.main.reviewList.css'],
  providers: [RestApiService, BusinessService, ReviewService, SessionDataService]
})
export class ReviewListComponent extends BaseComponent {
  id: number;
  subscription;
  count: number;
  userId: number;
  roleId: number = 5;
  reviewId: number;
  business = new Business();
  mailReviewId: number;
  deleteReviewId: number;
  getBusinessId: number;
  businessReplyId: number;
  reviewComment: string;
  emailFrom: string;
  replyToUser: string;
  review = new Reviews();
  reviewList: any;
  ratingForm: FormGroup;
  emailupForm: FormGroup;
  @Input()
  businessId: number;
  @Output()
  refreshId = new EventEmitter();
  isSpin: boolean = false;
  isLoad: boolean = true;
  isButtonRefresh: boolean = false;
  lastCount: number;
  pageOrder: string = 'Newest first';
  businessReplyID: number;
  businessUserReply: string;
  messageToUser: any = null;

  constructor(injector: Injector, private _router: Router,
              private elRef: ElementRef,
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
    this.emailupForm = this.fb.group({
      _reply: ['', Validators.required]
    });
    SessionDataService.getInstance().wishList$.subscribe(value => {
      //alert(total);
      this.pageOrder = 'Newest first';
      var reviewId = +value;
      this.id = reviewId;
      this.getReviews(this.id);
      //console.log("Header Total cart items:"+total);
    });

  }

  ngOnInit() {

    this.id = this.businessId;
    SessionDataService.getInstance().refresh$.subscribe(value => {
      this.getUserId();
    });
    this.getUserId();
    console.log('id value ', this.businessId);
    this.getReviews(this.id);

  }

  getUserId() {
    this.userId = this._sessionStorageService.getObject('userId');
    if (this.userId == null)
      this.userId = 0;
    this.roleId = this._sessionStorageService.getObject('roleId');
    if (this.roleId == null || this.roleId == 0)
      this.roleId = 5;
  }

  getBusiness() {
    var request = {
      id: this.getBusinessId
    };
    this._businessService.getBusinessById(request).then(res => this.cb_getBusiness(res));
  }

  cb_getBusiness(res) {
    this.business = res.business;
  }

  getReviews(id) {
    this.getBusinessId = id;
    this._restApiService.getById('/rating/getReviewByBusiness', id).then(res => this.cb_getReviews(res));
  }

  cb_getReviews(res) {
    this.isSpin = false;
    this.getBusiness();
    if (res.isSuccess) {
      console.log(JSON.stringify(res));
      this.reviewList = res.reviewList;
      this.count = this.reviewList.length;
      var totalCount = res.count;
      if (totalCount == this.count) {
        this.isLoad = false;
      }
      else {
        this.isLoad = true;
      }
    }

  }

  commentData(id, data) {
    this.reviewId = id;
    this._restApiService.getById('/rating/getReviewById', id).then(res => this.cb_editData(res));
  }

  cb_editData(res) {
    this.review = res.reviews;
  }

  saveReview() {
    var request = {
      review: this.review,
      date: ''

    };
    this._ratingService.editReview(request).then(res => this.cb_saveReview(res));
  }

  cb_saveReview(res) {
    if (res.isSuccess) {
      this.getReviews(this.id);
      this.refreshId.emit(1);
    }
  }

  deleteReview(id) {
    this.deleteReviewId = id;
  }

  delete() {
    var request = {
      id: this.deleteReviewId,
      businessId: this.businessId
    };
    this._ratingService.deleteReview(request).then(res => this.cb_delete(res));
  }

  cb_delete(res) {
    if (res.isSuccess) {
      this.getReviews(this.businessId);
      this.refreshId.emit(1);
    }
  }

  checkToEdit() {
    return this.reviewId;
  }

  pageOrderSelection(value) {
    this.pageOrder = value;
    this.getLoadMore();
  }

  getLoadMore() {
    this.isSpin = true;
    // alert(this.pageOrder)
    var request = {
      value: this.count,
      businessId: this.businessId,
      pageOrder: this.pageOrder
    };
    this._ratingService.getReviewPagination(request).then(res => this.cb_getLoadMore(res));
  }

  cb_getLoadMore(res) {
    this.isSpin = false;
    this.reviewList = res.reviewList;
    this.count = this.reviewList.length;
    var totalCount = res.count;
    if (totalCount == this.count)
      this.isLoad = false;
    else
      this.isLoad = true;
  }

  storeId(id, userId) {
    this.messageToUser = userId;
    this.mailReviewId = id;
    SessionDataService.getInstance().toIdMail('' + userId);
    this._sessionStorageService.setObject('toId', userId);
    const request = {
      fromId: this.userId,
      reviewId: this.mailReviewId
    };
    this._ratingService.mailToReviewer(request).then(res => this.cb_submitEmail(res));
  }

  submitEmail() {
    // this.isButtonRefresh = true;

  }

  cb_submitEmail(res) {
    this._router.navigate(['business/message', this.messageToUser]);
  }

  moveToUserReport(id, name) {
    if (this.userId != 0)
      this._router.navigate(['business/userReport/' + id, name]);
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

  reply(id, review) {
    $('#replyModal').modal('toggle');
    this.businessReplyId = id;
    this.commentData(id, review);
  }

  replyUser(reviewId, businessId) {
    var request = {
      reviewId: reviewId,
      businessId: businessId,
      reply: this.replyToUser
    };
    this._businessService.replyToUser(request).then(res => this.cb_replyUser(res));
  }

  cb_replyUser(res) {
    if (res.isSuccess) {
      $('#replyModal').modal('toggle');
      this.replyToUser = '';
      this.getReviews(this.id);
    }
  }

  businessreply(id, reply) {
    this.businessUserReply = reply;
    this.businessReplyID = id;
  }

  replyBusiness() {
    var request = {
      id: this.businessReplyID,
      reply: this.businessUserReply
    };
    this._ratingService.editBusinessReply(request).then(res => this.cb_businessReply(res));
  }

  cb_businessReply(res) {
    $('#businessReplyModal').modal('toggle');
    this.getReviews(this.id);
    if (res.isSuccess) {
      this.businessReplyID = 0;
      this.businessUserReply = '';
    }
  }

  deleteBusinessReply(id) {
    this.businessReplyID = id;
  }

  deleteReply(id) {
    var request = {
      id: this.businessReplyID
    };
    this._ratingService.deleteBusinessReply(request).then(res => this.cb_deleteReply(res));
  }

  cb_deleteReply(res) {
    this.getReviews(this.id);
  }
}
