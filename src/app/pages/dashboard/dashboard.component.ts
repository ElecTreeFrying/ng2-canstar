import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../common/core/service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public auth: AuthService
  ) { }

  ngOnInit() {
  }

  toHome() {
    this.router.navigate([ '/', 'home' ]).then(() => {
      this.router.navigate([ 'feed' ], {
        relativeTo: this.route,
        skipLocationChange: true
      })
    })
  }

  navigate(route: string) {
    this.router.navigate([ route ], {
      relativeTo: this.route,
      skipLocationChange: route === 'feed' ? true : false
    })
  }

}
