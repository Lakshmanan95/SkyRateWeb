import {Router, RouterModule, PreloadAllModules} from '@angular/router';


import {HomeMainComponent} from './com/home/main/com.home.main';
import {BeforeSearchComponent} from './com/mainmodules/homepage/beforeSearch/com.beforeSearch';
import {WelcomeInfo} from './com/mainmodules/welcomeInfo/com.mainmodules.welcomeInfo';

export const routing = RouterModule.forRoot([
  {path: 'home', component: BeforeSearchComponent},
  {path: 'login', component: BeforeSearchComponent},
  {path: '', component: BeforeSearchComponent},
  {path: 'welcome', component: WelcomeInfo},
  // {path: 'dashboard', component: BeforeSearchComponent}
], {useHash: true, preloadingStrategy: PreloadAllModules});
