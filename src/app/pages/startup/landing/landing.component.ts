import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  onRoute(route: string) {
    this.router.navigate(['/', 'startup', route], {
      relativeTo: this.route,
      skipLocationChange: true,
      replaceUrl: false
    })
  }

}
