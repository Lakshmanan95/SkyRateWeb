import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';



@Component({
   selector: 'modal',
   templateUrl:'com.common.mymodal.html',
   styleUrls:['com.common.mymodal.css']
})

export class Modal implements OnInit {
  @Input('show-modal') showModal: boolean;
  @Input('title') title: string;
  @Input('sub-title') subTitle: string;
  @Input('cancel-label') cancelLabel: string;
  @Input('positive-label') positiveLabel: string;

  @Output('closed') closeEmitter: EventEmitter < ModalResult > = new EventEmitter < ModalResult > ();
  @Output('loaded') loadedEmitter: EventEmitter < Modal > = new EventEmitter < Modal > ();
  @Output() positiveLabelAction = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.loadedEmitter.next(this);
  }

  show() {
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
    this.closeEmitter.next({
      action: ModalAction.POSITIVE
    });
  }

  positiveAction() {
    this.positiveLabelAction.next(this);
    return false;
  }

  cancelAction() {
    this.showModal = false;
    this.closeEmitter.next({
      action: ModalAction.CANCEL
    });
    return false;
  }
}

export enum ModalAction { POSITIVE, CANCEL }

export interface ModalResult {
  action: ModalAction;
}