import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
     moduleId: module.id,
    selector: 'welcome-dashboard',
    templateUrl: 'com.mainmodules.welcomeDash.html'
})
export class WelcomeDashComponent {
constructor(private _router: Router) {
  
  }
 }

