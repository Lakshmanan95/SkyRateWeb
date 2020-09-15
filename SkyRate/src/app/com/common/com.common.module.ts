import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './header/com.common.header';
import {FooterComponent} from './footer/com.common.footer';
import {Menu} from './menu/com.common.menu';
import {HomeMenu} from './menu/com.common.homemenu';
import {UserHeader} from './userheader/com.usermgmt.userheader';
import {Alert} from './alert/com.common.alert';
import {RouterModule} from '@angular/router';
import {ImageUploader} from './imageuploader/com.common.imageuploader';
import {FileUploadModule} from 'ng2-file-upload';
import {Modal} from './modal/com.common.mymodal';
import {SideMenu} from './sidemenu/com.common.sidemenu';
import {Logo} from './logo/com.common.logo';
import {TextMaskModule} from 'angular2-text-mask';
import {PopoverModule} from 'ngx-popover';
import {RegisterComponent} from './register/com.common.register';
import {LoginComponent} from './../usermgmt/login/ui/com.usermgmt.login';
import {EqualValidator} from './register/model/com.validation.password';
import {DocumentUploader} from './fileUpload/com.common.fileUpload';
import {SecondaryMenu} from './secondaryMenu/com.common.secondaryMenu';

@NgModule({
  imports: [PopoverModule, TextMaskModule, BrowserModule, FormsModule, ReactiveFormsModule, RouterModule, FileUploadModule],
  declarations: [HeaderComponent, DocumentUploader, EqualValidator, RegisterComponent, LoginComponent, SecondaryMenu, SideMenu, Logo, FooterComponent, UserHeader, Menu, HomeMenu, Alert, ImageUploader, Modal],
  exports: [HeaderComponent, DocumentUploader, RegisterComponent, LoginComponent, SecondaryMenu, SideMenu, Logo, FooterComponent, UserHeader, Menu, HomeMenu, Alert, ImageUploader, Modal],
})
export class CommonModule {
}
