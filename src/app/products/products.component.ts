import { ProductService } from './../services/product.service';
import { Router } from '@angular/router';
import { CompanyService } from './../services/company.service';
import { Component, OnInit } from '@angular/core';
import { Company } from '../models/company';
import { CategoryService } from '../services/category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  companies: Company[];
  categories = [];
  subCategories = [];
  formProduct: any = {};
  products = [];
  productDetails = [];

  modalContent = {
    modalTitle: '',
    productName: '',
    companyName: '',
    categoryName: '',
    subCategoryName: '',
  };
  formItemDetail: any = {};

  adminMenu: boolean;
  private roles: string[];
  userIdSession: string;

  constructor(
    private companyService: CompanyService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private modalService: NgbModal,
    private tokenStorage: TokenStorageService,

    private router: Router
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
    this.getCompanies();
    this.getCategories();
    this.getProducts();
    this.formProduct.companyId = null;
    this.formProduct.categoryId = null;
    this.formProduct.subCategoryId = null;
    this.formProduct.productStatus = null;
  }

  getCompanies() {
    this.companies = [];
    this.companyService.getCompanies().subscribe(
      (res: Company[]) => {
        this.companies = res;
      },
      (error) => {
        this.router.navigate(['login']);
        //console.log(error);
      }
    );
  }

  getCategories() {
    this.categories = [];
    this.subCategories = [];
    this.categoryService.getCategories().subscribe(
      (res) => {
        this.categories = res;
        this.subCategories = res[0].subCategories;
      },
      (error) => {
        console.log(error);
        this.router.navigate(['login']);
      }
    );
  }

  onCategoryChange(event) {
    let categoryId = event.target.value;
    let subCategory = this.categories.find((el) => el.categoryId == categoryId);
    this.subCategories = subCategory.subCategories;
  }

  onSubmitProduct(event) {
    if (this.formProduct.itemName == undefined) {
      event.preventDefault();

      alert('Please Enter Product Name!');
      return false;
    }
    if (this.formProduct.companyId == null) {
      event.preventDefault();

      alert('Please Select Company!');
      return false;
    }
    if (this.formProduct.categoryId == null) {
      event.preventDefault();

      alert('Please Select Category!');
      return false;
    }
    if (this.formProduct.subCategoryId == null) {
      event.preventDefault();

      alert('Please Select SubCategory!');
      return false;
    }
    if (this.formProduct.productStatus == null) {
      event.preventDefault();

      alert('Please Select Status!');
      return false;
    }

    let productInfo = {
      companyId: this.formProduct.companyId,
      itemName: this.formProduct.itemName,
      categoryId: this.formProduct.categoryId,
      subCategoryId: this.formProduct.subCategoryId,
      Active: this.formProduct.productStatus,
    };
    this.productService.AddProduct(productInfo).subscribe(
      (res) => {
        alert('Product Added Successfully');
        this.getProducts();
        console.log(res);
      },
      (error) => {
        this.router.navigate(['login']);
        //console.log(error);
      }
    );
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (res) => {
        this.products = res;
        setTimeout(() => {
          $('#tbl_product').DataTable();
        }, 500);
        console.log(this.products);
      },
      (error) => {
        //this.router.navigate(['login']);
        console.log(error);
      }
    );
  }

  AddProductDetails(content, product) {
    this.modalContent.modalTitle = 'Add';
    this.modalContent.productName = product.itemName;
    this.modalContent.companyName = product.companyName;
    this.modalContent.categoryName = product.categoryName;
    this.modalContent.subCategoryName = product.subCategoryName;

    this.formItemDetail = {};
    this.formItemDetail.itemId = product.itemId;
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

  onSubmitItemDetail() {
    let productDetail = {
      itemPrice: this.formItemDetail.itemPrice,
      itemSize: this.formItemDetail.itemSize,
      fineAmount: this.formItemDetail.fineAmount,
      rentalDays: this.formItemDetail.rentalDays,
      isActive: 1,
    };
    this.productDetails.push(productDetail);
    let product = {
      itemId: this.formItemDetail.itemId,
      itemDetails: this.productDetails,
    };
    this.productService.AddProductDetail(product).subscribe(
      (res) => {
        alert('Product Details Added Successfully');
        console.log(res);
      },
      (error) => {
        this.router.navigate(['login']);
        //console.log(error);
      }
    );
  }
  SignOut() {
    this.tokenStorage.signOut();
    location.reload();
  }
}
