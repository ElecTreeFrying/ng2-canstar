import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StartupRoutingModule } from './startup-routing.module';
import { MatStartupModule } from '../../common/core/module/mat-startup.module';

import { StartupComponent } from './startup.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    StartupComponent,
    LandingComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StartupRoutingModule,
    MatStartupModule,
  ]
})
export class StartupModule { }
