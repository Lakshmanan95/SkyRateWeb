import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
//========
import {CommonModule} from '../common/com.common.module';

import { LoginComponent }   from './../usermgmt/login/ui/com.usermgmt.login';
import { HomeMainComponent }   from './main/com.home.main';
import {SearchBusinessComponent} from '../mainmodules/searchbusiness/com.main.searchbusiness'
import {SearchListComponent} from '../mainmodules/searchbusiness/com.main.searchList'
@NgModule({
  imports:      [ BrowserModule, FormsModule,HttpModule,CommonModule],
  declarations: [ HomeMainComponent],
  exports:    [ HomeMainComponent]
})
export class HomeModule { }