import {Component, Injector} from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router'
import { BaseComponent } from '../basic/com.common.basic.basecomponent';

@Component({
  moduleId:module.id,
  selector: 'footer',
  templateUrl: 'com.common.footer.html',
  styleUrls: ['styles/com.common.footer.css']
})
export class FooterComponent extends BaseComponent {
   

constructor(injector:Injector ,
        private _router : Router,
        private _route : ActivatedRoute){
        super(injector);
        }
  contact(){
    this._router.navigate(['dashboard/contact']);
}
  aboutus(){
    this._router.navigate(['dashboard/about-us']);
  }
  privacypolicy(){
    this._router.navigate(['dashboard/privacypolicy']);
  }
  termsofuse(){
    this._router.navigate(['dashboard/termsofuse']);
  }
 }