import { TokenStorageService } from './../auth/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../models/user.service';

@Component({
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  userId: number;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = new User();

    this.userId = parseInt(sessionStorage.getItem('userId'));

    this.userService.getUser(this.userId).subscribe(
      (data) => {
        console.log(data);
        this.user = data;
      },
      (error) => {
        console.log(error);
        this.router.navigate(['login']);
      }
    );
  }

  updateEmployee() {
    this.userService.updateUser(this.userId, this.user).subscribe(
      (data) => {
        console.log(data);
        this.user = new User();
        this.reloadPage();
      },
      (error) => console.log(error)
    );
  }

  onSubmit() {
    this.updateEmployee();
  }

  reloadPage() {
    window.location.reload();
  }
}
