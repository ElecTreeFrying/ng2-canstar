import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: 'feed', loadChildren: './feed/feed.module#FeedModule' },
    { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
    { path: 'register', loadChildren: './register-car/register-car.module#RegisterCarModule' }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
