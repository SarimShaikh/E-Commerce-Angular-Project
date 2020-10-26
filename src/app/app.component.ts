import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TokenStorageService } from './auth/token-storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  
  private roles: string[];
  private authority: string;
  title = 'e-commerce-app';
  route: string;
  class: string;
  
  //constructor(private tokenStorage: TokenStorageService) { }
  constructor(location: Location, router: Router , private tokenStorage: TokenStorageService) {
    router.events.subscribe((val) => {
    	if ('url' in val && typeof val.url != undefined && val.url) {
    		this.route = val.url
    		if (val.url == '/login') {
    			this.class = 'login-page full-screen';
    		}
    		else if (val.url == '/register') {
    			this.class = 'register-page full-screen';
        }
        else if (val.url == '/profile') {
    			this.class = 'add-product';
    		}
    	}
    	
    });
  }
  
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_USER') {
          this.authority = 'user';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }
  
}
