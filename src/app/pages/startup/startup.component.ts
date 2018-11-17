import { Component, OnInit } from '@angular/core';

import { SharedService } from '../../common/core/service/shared.service';

@Component({
  selector: 'app-startup',
  template: `
    <div id="startup-content">
      <mat-card>
        <mat-card-content>
          <router-outlet></router-outlet>
        </mat-card-content>
        <mat-card-footer *ngIf="isLoading">
          <mat-progress-bar mode="indeterminate" style="position:absolute;bottom:0;"></mat-progress-bar>
        </mat-card-footer>
      </mat-card>
    </div>
  `
})
export class StartupComponent implements OnInit {

  isLoading: boolean = false;

  constructor(
    private shared: SharedService
  ) { }

  ngOnInit() {
    this.shared.loadingChanged.subscribe((res: boolean) => {
      console.log(res);
      this.isLoading = res;
    });
  }

}
