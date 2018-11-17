import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterCarRoutingModule } from './register-car-routing.module';
import { MatRegisterCarModule } from '../../../common/core/module/mat-register-car.module';

import { RegisterCarComponent } from './register-car.component';

@NgModule({
  declarations: [
    RegisterCarComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegisterCarRoutingModule,
    MatRegisterCarModule
  ]
})
export class RegisterCarModule { }
