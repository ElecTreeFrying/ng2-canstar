import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  navigation: string[] = [];

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.navigation = [ 'Home', 'Register a car', 'Messages', 'History', 'About Us' ];
  }

  navigate(path: string) {
    path = path.toLowerCase();
    path =
      path === 'home' ? 'feed'
        : path === 'register a car' ? 'register'
        : path === 'about us' ? 'about'
        : path;

    this.router.navigate([ 'home', path ]);
  }

}
