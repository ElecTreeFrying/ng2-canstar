import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../../common/core/service/auth.service';
import { SharedService } from '../../../common/core/service/shared.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  isDisable: boolean;
  isEmail: boolean;

  get error() {
    return {
      email: this.form.get('email').errors,
      password: this.form.get('password').errors,
      display: this.form.get('display').errors,
      type: this.form.get('type').errors
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
      'email': [ '', [ Validators.email, Validators.required ] ],
      'password': [ '', [ Validators.minLength(6), Validators.required ] ],
      'display': [ '', [ Validators.minLength(5), Validators.required ] ],
      'type': [ '', [ , Validators.required ] ]
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
      this.shared.openSnack('startup');
      return;
    }
    const form = this.form.value;
    this.auth.signUp(form);
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
