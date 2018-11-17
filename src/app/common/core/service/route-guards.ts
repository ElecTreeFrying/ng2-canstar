import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class EntryGuard implements CanActivate, CanActivateChild {

  constructor(
    private fire: AngularFireAuth
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    this.fire.authState.pipe(
      map((user: any) => {
        return user !== null
      })
    ).subscribe(() => 0);

    return this.fire.authState.pipe(
      map((user: any) => user !== null)
    );
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

}

@Injectable({
  providedIn: 'root'
})
export class ExitGuard implements CanActivate, CanActivateChild {

  constructor(
    private fire: AngularFireAuth
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    this.fire.authState.pipe(
      map((user: any) => {
        return user === null
      })
    ).subscribe(() => 0);

    return this.fire.authState.pipe(
      map((user: any) => user === null)
    );
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

}
