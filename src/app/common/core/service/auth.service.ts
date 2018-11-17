import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { SharedService } from './shared.service';

import { User, Social, AuthError } from '../../shared/interface/fireAuth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  state: any;

  constructor(
    private zone: NgZone,
    private router: Router,
    private fire: AngularFireAuth,
    private shared: SharedService
  ) {
    fire.authState.subscribe((res: any) => {
      this.state = res;
      console.log(this.state);
      // this.router.navigate([ 'home', 'register' ]);
      res !== null
        ? this.router.navigate([ 'home' ]).then(() => {
            this.router.navigate([ 'home', 'feed' ], { skipLocationChange: true, replaceUrl: false });
          })
        : this.router.navigate([ '/', 'startup' ], { skipLocationChange: true, replaceUrl: false });
    });
  }

  signUp(user: User) {
    this.shared.setLoading = true;
    this.fire.auth.createUserWithEmailAndPassword(user.email, user.password).then((res: any) => {
      console.log(res);
      this.toHome();
    }).catch((e: AuthError) => {
      this.shared.openSnack('message', e.message);
    });
  }

  signIn(user: User) {
    this.shared.setLoading = true;
    this.fire.auth.signInWithEmailAndPassword(user.email, user.password).then((res: any) => {
      console.log(res);
      this.toHome();
    }).catch((e: AuthError) => {
      this.shared.openSnack('message', e.message);
    });
  }

  signInSocial(option: string) {
    this.shared.setLoading = true;
    this.fire.auth.signInWithPopup(Social()[option]).then((res: any) => {
      console.log(res);
      this.toHome();
    }).catch((e: AuthError) => {
      this.shared.openSnack('message', e.message);
    });
  }

  signOut(): any {
    console.log('z');
    return this.fire.auth.signOut().then(() => {
      console.log('signed-out');
      this.router.navigate([ '/' ]).then(() => {
        this.router.navigate([ '/' ]).then(() => {
          this.router.navigate([ 'startup' ], { skipLocationChange: true, replaceUrl: true })
        })
      })
    }).catch((e: AuthError) => {
      this.shared.openSnack('message', e.message);
    });
  }

  private toHome() {
    this.shared.setLoading = false;
    this.zone.run(() => {
      this.router.navigate([ '/', 'home' ]);
    })
  }

}
