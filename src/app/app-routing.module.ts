import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntryGuard, ExitGuard } from './common/core/service/route-guards';

const routes: Routes = [
  { path: 'startup', loadChildren: './pages/startup/startup.module#StartupModule', canActivate: [ ExitGuard ] },
  { path: 'home', loadChildren: './pages/dashboard/dashboard.module#DashboardModule', canActivate: [ EntryGuard ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
