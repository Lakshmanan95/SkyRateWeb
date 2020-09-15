import {Component, Injector, AfterViewChecked, ElementRef, ViewChild,} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {BusinessService} from '../../service/com.service.business';
import {BaseComponent} from '../../common/basic/com.common.basic.basecomponent';
import {Messenger} from '../model/com.model.message';
import {RestApiService} from '../../common/service/restapi/com.common.service.restapiservice';
import {SessionDataService} from '../../common/service/com.common.sessiondata';
import {MessageService} from '../../service/com.service.message';
import {UserMgmtService} from '../../usermgmt/service/com.service.usermgmt';
import {User} from '../../usermgmt/model/com.usermgmt.user.model';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';


declare var $: any;

@Component({
  selector: 'message',
  templateUrl: 'com.main.message.html',
  styleUrls: ['com.main.message.css'],
  providers: [UserMgmtService, RestApiService, SessionDataService, SessionDataService]
})
export class MessageComponent extends BaseComponent {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  user = new User();
  message: string = '';
  messages = [];
  readCount: any;
  inboxes: any;
  userId: any;
  toId: number;
  count: number;
  time: any;
  toName: string = '';
  messenger = new Messenger();
  private serverUrl = 'http://localhost:8080/socket';
  private title = 'WebSockets chat';
  private stompClient;
  notificationSubscription: any;
  selectedConversationId: number;
  messageResponse = false;
  inboxResponse = false;
  sendingMessageToUser = null;
  addNewUserInbox = false;
  isConversationCleared = false;
  messageDeleted = false;

  constructor(injector: Injector,
              private _router: Router,
              private _restApiService: RestApiService,
              private _userMgmtService: UserMgmtService,
              private _messageService: MessageService,
              private _route: ActivatedRoute) {
    super(injector);

    this.userId = this._sessionStorageService.getObject('userId');
    if (this.userId === null) {
      this.userId = 0;
    }

    this.notificationSubscription = this._messageService.notificationCount$
      .subscribe(data => {
        this.count = data ? data.read : 0;
        if (this.count > 0) {
          this.refreshInbox();
          this.getMessageList();
        }
      });
  }

  ngOnInit() {
    this.toId = this._sessionStorageService.getObject('toId');
    SessionDataService.getInstance().toId$.subscribe(value => {
      const id = value;
      this.toId = +id;
    });
    const d = new Date();
    window.scrollTo(0, 0);
    this.time = d.setHours(d.getHours() - 2);
    this._sessionStorageService.setObject('toId', '');

    // Listen to route params
    this._route.params.subscribe((params) => {
      this.sendingMessageToUser = (params && params.toUserId) ? parseInt(params.toUserId, 10) : null;
      this.toId = this.sendingMessageToUser;
      this.getDefaultConversation();
    });

    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  getStyle(readCount, fromId, toId) {
    if (readCount !== 0 && this.userId !== fromId) {
      const styles = {
        'background-color': '#9f9e9e'
      };
      return styles;
    }
    if (toId === this.toId) {
      const styles1 = {
        'background-color': '#94b5b7'
      };
      return styles1;
    }
  }

  getDefaultConversation() {
    if (!this.toId) {
      this._restApiService.getById('/message/getConversation', this.userId).then(res => this.cb_getDefaultConversation(res));
    } else {
      this.getToUser();
    }
  }

  handleNewUserInbox(messages) {
    if (this.sendingMessageToUser && (messages || messages.length === 0)) {
      const messageToUser = messages.find(m => m.toId === parseInt(this.sendingMessageToUser, 10));
      const messageFromUser = messages.find(m => m.fromId === parseInt(this.sendingMessageToUser, 10));
      if ((!messageToUser && !messageFromUser)) {
        this.addNewUserInbox = true;
      } else {
        this.addNewUserInbox = false;
      }
    }
  }

  cb_getDefaultConversation(res) {
    this.toId = res.toId;
    this.messages = res.messages;
    this.handleNewUserInbox(this.messages);
    this.getToUser();
  }

  getToUser() {
    const request = {
      id: this.toId
    };
    if (this.toId) {
      this._userMgmtService.getUserById(request).then(res => this.cb_getUserById(res));
    } else {
      this.messageResponse = true;
      this.inboxResponse = true;
    }
  }

  cb_getUserById(res) {
    this.user = res.user;
    this.toName = this.user.firstName + ' ' + this.user.lastName;
    this.getInbox();
  }

  getInbox() {
    const request = {
      id: this.userId
    };
    this._messageService.getInboxById(request).then(res => this.cb_getInbox(res));
  }

  getFirstConversation(inboxes) {
    if (inboxes && inboxes.length > 0) {
      if (this.sendingMessageToUser && !this.addNewUserInbox) {
        return inboxes.find(inbox => inbox.toId === this.sendingMessageToUser && inbox.fromId === this.userId);
      }
      return inboxes[0];
    }
    return null;
  }

  toTimestamp(strDate) {
    return Date.parse(strDate);
  }

  cb_getInbox(res) {
    this.messageResponse = true;
    this.inboxResponse = true;
    this.handleNewUserInbox(res.messages);
    if (this.sendingMessageToUser && this.addNewUserInbox) {
      const initialInboxItem = {
        id: 0,
        fromId: this.userId,
        toId: this.sendingMessageToUser,
        conversationId: null,
        reviewId: 0,
        message: '',
        dateTime: this.toTimestamp(new Date().toUTCString()),
        readFlag: 0,
        defaultMessage: 0,
        ownerId: this.userId,
        deleteFlag: 0,
        uniqueMessageId: null,
        fromName: this.user.userName,
        fromImage: 'assets/img/boyUser.png',
        toName: this.toName,
        toImage: 'assets/img/boyUser.png',
        readCount: 0,
        recentDate: null
      };
      res.messages.splice(0, 0, initialInboxItem);
      res.messages.join();
    }
    this.inboxes = res.messages;
    const firstConv = this.getFirstConversation(this.inboxes);
    if (firstConv && firstConv.conversationId != null) {
      this.toName = firstConv.toName;
      this.selectedConversationId = firstConv.conversationId;
      this.getByConversation(firstConv.conversationId, firstConv.toId, firstConv.fromId, firstConv.fromName, firstConv.toName);
      this.getMessageList();
     // this.getCount();
    }
  }

  refreshInbox() {
    this.messageDeleted = false;
    const request = {
      id: this.userId
    };
    this._messageService.getInboxById(request).then(res => this.updateInbox(res));
  }

  updateInbox(res) {
    this.inboxes = res.messages;
    const firstConv = this.inboxes && this.inboxes.length > 0 ? this.inboxes[0] : null;
    this.selectedConversationId = (res.messages && res.messages.length > 0) ? res.messages[0].conversationId : null;
    if (this.isConversationCleared && firstConv) {
      this.getByConversation(firstConv.conversationId, firstConv.toId, firstConv.fromId, firstConv.fromName, firstConv.toName);
    }
  }

  getCount() {
    const request = {
      fromId: this.user.id
    };
    this._messageService.readCount(request);
  }

  cb_getCount(res) {
    this.count = res.read;
    this.mapToCount(this.count);
  }

  mapToCount(count) {
    SessionDataService.getInstance().addcount('' + count);
  }

  getMessageList() {
    var request = {
      fromId: this.userId,
      toId: this.toId,
      ownerId: this.userId
    };
    this._messageService.getMessagesById(request).then(res => this.cb_getMessageList(res));
  }

  cb_getMessageList(res) {
    this.messages = res.messages;
    if (this.messages && this.messages.length > 0) {
      this.selectedConversationId = this.messages[0].conversationId;
    }
    this.handleNewUserInbox(this.messages);
    if (this.messageDeleted) {
      this.refreshInbox();
    }
  }

  getByConversation(id, to, from, fromName, toName) {
    this.selectedConversationId = id;
    if (to != this.userId) {
      this.toName = toName;
      this.toId = to;
    }
    else {
      this.toId = from;
      this.toName = fromName;
    }

    var request = {
      id: id,
      toId: to,
      ownerId: this.userId
    };
    this._messageService.getConversationById(request).then(res => this.cb_getByConversation(res));
  }

  /**
   * Clear read count for initial inbox item
   */
  clearNewMessageCount() {
    try {
      this.inboxes.find(p => p.conversationId === this.selectedConversationId).readCount = 0;
    } catch (e) {
      console.warn('No current selected message');
    }
  }

  cb_getByConversation(res) {
    this.messages = res.messages;
    // this.refreshInbox();
    // this.getCount();
  }

  sendMessage() {
    const request = {
      from: this.userId,
      to: this.toId,
      message: this.message
    };
    this.message.trim();

    if (this.message.length > 1 && this.message) {
      this._messageService.addMessage(request).then(res => this.cb_addMessage(res));
    }

  }

  cb_addMessage(res) {
    if (res.isSuccess) {
      this.message = '';
      this.messageDeleted = true;
      this.isConversationCleared = true;
      this.getMessageList();
    }
  }

  deleteSingleMessage(value) {
    const request = {
      uniqueId: value
    };
    this._messageService.deleteMessage(request).then(res => this.cb_addMessage(res));
  }

  getStyles(x) {
    if (x === this.userId) {
      const styles = {
        'float': 'right'
      };
      return styles;
    }
  }

  getCloseStyle(x) {
    if (x !== this.userId) {
      const styles = {
        'display': 'none'
      };
      return styles;
    }
  }

  getTextStyles(x) {
    // alert(x)
    if (x === this.userId) {
      const styles = {
        'background-color': 'rgb(148, 181, 183)',
        // 'background-color':'',
        'color': 'black'
      };
      return styles;
    }
  }

  clearAll() {
    const request = {
      userId: this.userId,
      toId: this.toId,
    };
    this.toName = '';
    this._messageService.clearAllMessage(request).then(res => this.cb_getClear(res));
  }

  cb_getClear(res) {
    if (res.isSuccess) {
      this.getMessageList();
      this.refreshInbox();
      this.isConversationCleared = true;
    }
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

}
