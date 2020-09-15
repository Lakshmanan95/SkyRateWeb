import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'skyrate',
  templateUrl: 'com.usermgmt.skyrate.html'
})
export class SkyrateComponent {
  hideSubMenu: any = false;
  constructor(private route: ActivatedRoute) {
    this.hideSubMenu = route.data.map(d => d.hideSubMenu);
  }
}
