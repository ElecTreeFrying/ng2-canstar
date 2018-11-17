import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../../common/core/service/auth.service';
import { SharedService } from '../../../common/core/service/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  isDisable: boolean;
  isEmail: boolean;

  get error() {
    return {
      email: this.form.get('email').errors,
      password: this.form.get('password').errors
    }
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    @Inject(FormBuilder) public fb: FormBuilder,
    private auth: AuthService,
    private shared: SharedService
  ) {
    this.form = fb.group({
      'email': [ 'a@a.com', [ Validators.email, Validators.required ] ],
      'password': [ '123123', [ Validators.minLength(6), Validators.required ] ],
    })
  }

  ngOnInit() {
    this.isEmail = false;
    this.isDisable = this.form.untouched;
  }

  social(option: string) {
    if (option === 'email') {
      this.isEmail = true;
      return;
    }

    this.auth.signInSocial(option)
  }

  onSubmit() {
    if (this.form.invalid) {
      this.shared.openSnack('startup')
      return;
    }
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.auth.signIn({ email, password  });
  }

  onBack(option: boolean) {
    option
      ? this.router.navigate(['../'], {
        relativeTo: this.route,
        skipLocationChange: true,
        replaceUrl: false
      })
      : this.isEmail = false;
  }

}
