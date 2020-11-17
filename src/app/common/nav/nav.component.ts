import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  adminMenu: boolean;
  private roles: string[];
  userIdSession: string;

  constructor(private tokenStorage: TokenStorageService) {}

  ngOnInit() {
    this.userIdSession = this.tokenStorage.getUserId();

    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
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

  GoToHome() {
    window.location.href = '';
  }

  SignOut() {
    this.tokenStorage.signOut();
    location.reload();
  }
}
