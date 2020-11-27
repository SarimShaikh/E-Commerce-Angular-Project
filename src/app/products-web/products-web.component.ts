import { CategoryService } from './../services/category.service';
import { ViewproductsService } from './../services/viewproducts.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Renderer2 } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products-web',
  templateUrl: './products-web.component.html',
  styleUrls: ['./products-web.component.css'],
})
export class ProductsWebComponent implements OnInit {
  items = [];
  page = 0;
  size = 5;
  pageNumber = 0;
  totalItems = 0;
  searchedValue = undefined;
  categories = [];
  subCategoryId = undefined;
  public IsCollapse = true;
  form: any = {};
  itemDetails = [];

  addToCartItem: any = {};
  addToCartItemDetail: any = {};

  cartItems = [];

  //Menu Logic Variables

  modulesList: Array<any>;
  enteredButton = false;
  isMatMenuOpen = false;
  isMatMenu2Open = false;
  prevButtonTrigger;
  constructor(
    private viewProductService: ViewproductsService,
    private categoryService: CategoryService,
    private ren: Renderer2,
    private modalService: NgbModal
  ) {
    this.getCategories();
    this.getProductsAll();
  }

  ngOnInit() {
    let categoryId = window.localStorage.getItem('CategoryId');
    let subCategoryId = window.localStorage.getItem('SubCategoryId');

    setTimeout(() => {
      if (categoryId !== undefined) {
        this.getItemWithCategory(categoryId);
      }
    }, 500);

    setTimeout(() => {
      if (subCategoryId !== undefined) {
        this.getItemWithSubCat(JSON.parse(subCategoryId));
      }
    }, 500);
  }

  getProductsAll() {
    this.viewProductService.getProductsAll().subscribe(
      (res) => {
        console.log(res);
        this.items = res.items;
        this.totalItems = res.totalItems;
      },
      (error) => {
        // this.router.navigate(['login']);
        console.log(error);
      }
    );
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

  public onPageChange(pageNum): void {
    //this.page = pageNum;
    //this.size = this.size * (pageNum - 1);
    this.pageNumber = pageNum - 1;
    this.viewProductService
      .getProductsAllByPage(this.pageNumber, this.size, this.searchedValue)
      .subscribe(
        (res) => {
          console.log(res);
          this.items = res.items;
          this.totalItems = res.totalItems;
        },
        (error) => {
          // this.router.navigate(['login']);
          console.log(error);
        }
      );
  }

  onSearch(value) {
    console.log(this.pageNumber);
    this.searchedValue = value;
    this.viewProductService
      .getProductsAllByPage(this.pageNumber, this.size, this.searchedValue)
      .subscribe(
        (res) => {
          console.log(res);
          this.items = res.items;
          this.totalItems = res.totalItems;
        },
        (error) => {
          // this.router.navigate(['login']);
          console.log(error);
        }
      );
  }

  getItemWithCategory(Id) {
    this.viewProductService
      .getProductsAllWithCategoryByPage(
        this.pageNumber,
        this.size,
        Id,
        this.subCategoryId
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.items = res.items;
          this.totalItems = res.totalItems;
        },
        (error) => {
          // this.router.navigate(['login']);
          console.log(error);
        }
      );
  }

  getItemWithSubCat(subCat) {
    console.log(subCat);
    this.viewProductService
      .getProductsAllWithCategoryByPage(
        this.pageNumber,
        this.size,
        subCat.categoryId,
        subCat.subCategoryId
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.items = res.items;
          this.totalItems = res.totalItems;
        },
        (error) => {
          // this.router.navigate(['login']);
          console.log(error);
        }
      );
  }

  AddToCart(item, content) {
    this.addToCartItem = item;
    this.form.size = null;
    this.itemDetails = item.itemDetails;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          //this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  onSizeChange(event) {
    let itemDetailId = event.target.value;
    let itemDetail = this.itemDetails.filter(
      (x) => x.itemDetailId == itemDetailId
    );

    this.form.price = itemDetail[0].itemPrice;
    this.form.rentalDays = itemDetail[0].rentalDays;
    this.form.penaltyCharges = itemDetail[0].fineAmount;

    this.addToCartItemDetail = itemDetail;
  }

  onCartSubmit() {
    this.addToCartItem.itemDetails = this.addToCartItemDetail;
    this.cartItems.push(this.addToCartItem);

    window.localStorage.setItem('CartItems', JSON.stringify(this.cartItems));
    this.modalService.dismissAll();
    //console.log(this.addToCartItem);
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
