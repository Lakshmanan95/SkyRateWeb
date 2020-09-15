import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {SessionStorageService} from '../common/service/com.common.sessionstorage';


@Injectable()
export class AuthRouteGuard implements CanActivate {

  constructor(
    private sessionStorageService: SessionStorageService,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const userId = this.sessionStorageService.getObject('userId');
    if (!userId) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
