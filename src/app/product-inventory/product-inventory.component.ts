import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-product-inventory',
  templateUrl: './product-inventory.component.html',
  styleUrls: ['./product-inventory.component.css'],
})
export class ProductInventoryComponent implements OnInit {
  productInv = {};
  adminMenu: boolean;
  private roles: string[];
  userIdSession: string;
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private productService: ProductService
  ) {}

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
    this.getInventory();
  }

  getInventory() {
    this.productInv = [];
    this.productService.getInventory().subscribe(
      (res) => {
        this.productInv = res;
        console.log(res);

        setTimeout(() => {
          $('#tbl_product_inv').DataTable();
        }, 500);
      },
      (error) => {
        console.log(error);
        this.router.navigate(['login']);
      }
    );
  }

  SignOut() {
    this.tokenStorage.signOut();
    location.reload();
  }
}
