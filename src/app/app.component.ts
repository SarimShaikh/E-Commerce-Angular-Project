import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TokenStorageService } from './auth/token-storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private roles: string[];
  private authority: string;
  title = 'e-commerce-app';
  route: string;
  class: string;
  adminMenu: boolean;
  userId: string;

  //constructor(private tokenStorage: TokenStorageService) { }
  constructor(
    location: Location,
    router: Router,
    private tokenStorage: TokenStorageService
  ) {
    router.events.subscribe((val) => {
      if ('url' in val && typeof val.url != undefined && val.url) {
        this.route = val.url;
        if (val.url == '/login') {
          this.class = 'login-page full-screen';
        } else if (val.url == '/register') {
          this.class = 'register-page full-screen';
        } else if (val.url == '/profile') {
          this.class = 'add-product';
        } else {
          this.class = 'ecommerce-page';
        }
      }
    });
  }

  ngOnInit() {
    console.log(this.tokenStorage.getUserId());
    this.userId = this.tokenStorage.getUserId();
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      // this.roles.every((role) => {
      //   if (role === 'ROLE_ADMIN') {
      //     this.adminMenu = true;
      //   } else if (role === 'ROLE_SUB_ADMIN') {
      //     this.adminMenu = true;
      //   } else if (role === 'ROLE_USER') {
      //     this.adminMenu = false;
      //   }
      // });
      if (
        this.roles.includes('ROLE_ADMIN') ||
        this.roles.includes('ROLE_SUB_ADMIN')
      ) {
        this.adminMenu = true;
      } else {
        this.adminMenu = false;
      }
    }
  }

  SignOut() {
    this.tokenStorage.signOut();
    location.reload();
  }
}
