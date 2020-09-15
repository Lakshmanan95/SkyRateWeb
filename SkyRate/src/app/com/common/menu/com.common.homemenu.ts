import { Component, ElementRef } from '@angular/core';
import {FormComponent} from '../../common/basic/com.common.basic.formcomponent';
import {Injector} from '@angular/core';
declare var jQuery : any;
declare var $ : any;
@Component({
  moduleId:module.id,
  selector: 'home-menu',
  styleUrls:['com.common.homemenu.css'],
  templateUrl: 'com.common.homemenu.html'
})
export class HomeMenu extends FormComponent{

     constructor(injector:Injector) {
          super(injector);
         
     }
    
     onClick(){
      
     }
     title = 'abgular 4 with jquery';
     toggleTitle(){
       $('.title').slideToggle(); //
     }
   
     ngOninit(){
     
     }
     
 }
