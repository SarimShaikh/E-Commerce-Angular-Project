import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  adminMenu: boolean;
  private roles: string[];
  userIdSession: string;
  categories = [];

  //Menu Logic Variables

  modulesList: Array<any>;
  enteredButton = false;
  isMatMenuOpen = false;
  isMatMenu2Open = false;
  prevButtonTrigger;

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router,
    private categoryService: CategoryService,
    private ren: Renderer2
  ) {}

  ngOnInit() {
    this.getCategories();

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
  getCategories() {
    this.categoryService.getCategories().subscribe(
      (res) => {
        this.categories = res;
      },
      (error) => {
        // this.router.navigate(['login']);
        console.log(error);
      }
    );
  }
  goToCart() {
    this.router.navigate(['cart']);
  }
  goToProudcts() {
    this.router.navigate(['viewproducts']);
  }
  searchByCategory(category) {
    window.localStorage.setItem('CategoryId', category.categoryId);

    this.router.navigate(['viewproducts']);
  }

  searchBySubCategory(childL2) {
    window.localStorage.setItem('SubCategoryId', JSON.stringify(childL2));

    this.router.navigate(['viewproducts']);
  }

  //Menu Code

  menuenter() {
    this.isMatMenuOpen = true;
    if (this.isMatMenu2Open) {
      this.isMatMenu2Open = false;
    }
  }

  menuLeave(trigger, button) {
    setTimeout(() => {
      if (!this.isMatMenu2Open && !this.enteredButton) {
        this.isMatMenuOpen = false;
        trigger.closeMenu();
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-focused'
        );
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-program-focused'
        );
      } else {
        this.isMatMenuOpen = false;
      }
    }, 80);
  }

  menu2enter() {
    this.isMatMenu2Open = true;
  }

  menu2Leave(trigger1, trigger2, button) {
    setTimeout(() => {
      if (this.isMatMenu2Open) {
        trigger1.closeMenu();
        this.isMatMenuOpen = false;
        this.isMatMenu2Open = false;
        this.enteredButton = false;
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-focused'
        );
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-program-focused'
        );
      } else {
        this.isMatMenu2Open = false;
        trigger2.closeMenu();
      }
    }, 100);
  }

  buttonEnter(trigger) {
    setTimeout(() => {
      if (this.prevButtonTrigger && this.prevButtonTrigger !== trigger) {
        this.prevButtonTrigger.closeMenu();
        this.prevButtonTrigger = trigger;
        this.isMatMenuOpen = false;
        this.isMatMenu2Open = false;
        trigger.openMenu();
        this.ren.removeClass(
          trigger.menu.items.first['_elementRef'].nativeElement,
          'cdk-focused'
        );
        this.ren.removeClass(
          trigger.menu.items.first['_elementRef'].nativeElement,
          'cdk-program-focused'
        );
      } else if (!this.isMatMenuOpen) {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger;
        trigger.openMenu();
        this.ren.removeClass(
          trigger.menu.items.first['_elementRef'].nativeElement,
          'cdk-focused'
        );
        this.ren.removeClass(
          trigger.menu.items.first['_elementRef'].nativeElement,
          'cdk-program-focused'
        );
      } else {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger;
      }
    });
  }

  buttonLeave(trigger, button) {
    setTimeout(() => {
      if (this.enteredButton && !this.isMatMenuOpen) {
        trigger.closeMenu();
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-focused'
        );
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-program-focused'
        );
      }
      if (!this.isMatMenuOpen) {
        trigger.closeMenu();
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-focused'
        );
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-program-focused'
        );
      } else {
        this.enteredButton = false;
      }
    }, 100);
  }
}
