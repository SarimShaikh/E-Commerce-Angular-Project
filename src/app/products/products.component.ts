import { ProductService } from './../services/product.service';
import { Router } from '@angular/router';
import { CompanyService } from './../services/company.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Company } from '../models/company';
import { CategoryService } from '../services/category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  itemDetails = [];
  selecteditemId: number;
  modalContent = {
    modalTitle: '',
    productName: '',
    companyName: '',
    categoryName: '',
    subCategoryName: '',
    modalBodyTitle: '',
  };
  formItemDetail: any = {};

  itemImages = [];

  selectedFiles: FileList;

  constructor(
    private companyService: CompanyService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private modalService: NgbModal,

    private router: Router
  ) {}

  ngOnInit() {
    this.getCompanies();
    this.getCategories();
    this.getProducts();
    this.resetProductForm();
  }
  resetProductForm() {
    this.formProduct.companyId = null;
    this.formProduct.categoryId = null;
    this.formProduct.subCategoryId = null;
    this.formProduct.productStatus = null;
    this.formProduct.itemName = '';
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

  AddProduct(content) {
    this.modalContent.modalTitle = 'Add';
    this.resetProductForm();

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

  onSubmitProduct(event, modal) {
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

    if (this.formProduct.itemId == undefined) {
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
          this.modalService.dismissAll();
          console.log(res);
        },
        (error) => {
          //this.router.navigate(['login']);
          console.log(error);
        }
      );
    } else {
      let productInfo = {
        itemId: this.formProduct.itemId,
        companyId: this.formProduct.companyId,
        itemName: this.formProduct.itemName,
        categoryId: this.formProduct.categoryId,
        subCategoryId: this.formProduct.subCategoryId,
        Active: this.formProduct.productStatus,
        itemDetails: [],
      };
      this.productService.UpdateProduct(productInfo).subscribe(
        (res) => {
          alert('Product Updated Successfully');
          this.getProducts();
          this.modalService.dismissAll();

          console.log(res);
        },
        (error) => {
          console.log(error);

          this.router.navigate(['login']);
        }
      );
    }
  }
  getProducts() {
    $('#tbl_product').DataTable().destroy();
    this.productService.getProducts().subscribe(
      (res) => {
        this.products = res.items;
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
        this.modalService.dismissAll();
        this.getProducts();
        console.log(res);
      },
      (error) => {
        this.router.navigate(['login']);
        //console.log(error);
      }
    );
  }

  ViewProductDetails(content, product) {
    this.modalContent.modalTitle = 'View';
    this.modalContent.productName = product.itemName;
    this.selecteditemId = product.itemId;
    this.itemDetails = [];
    for (var i = 0; i < product.itemDetails.length; i++) {
      let productDetail = {
        itemSize: product.itemDetails[i].itemSize,
        itemPrice: product.itemDetails[i].itemPrice,
        fineAmount: product.itemDetails[i].fineAmount,
        rentalDays: product.itemDetails[i].rentalDays,
        itemDetailId: product.itemDetails[i].itemDetailId,
        editable: false,
      };
      this.itemDetails.push(productDetail);
    }

    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
      })
      .result.then(
        (result) => {
          //this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  editProductDetail(productDetail) {
    productDetail.editable = !productDetail.editable;
  }

  onCancel(productDetail) {
    productDetail.editable = !productDetail.editable;
  }
  onDone(productDetail) {
    let productDetails = [];
    productDetail.editable = !productDetail.editable;
    let prdDetail = {
      itemSize: productDetail.itemSize,
      itemPrice: productDetail.itemPrice,
      fineAmount: productDetail.fineAmount,
      rentalDays: productDetail.rentalDays,
      itemId: this.selecteditemId,
      itemDetailId: productDetail.itemDetailId,
      isActive: 1,
    };

    productDetails.push(prdDetail);

    let itemDetails = {
      itemDetails: productDetails,
    };

    this.productService.UpdateProductDetail(itemDetails).subscribe(
      (res) => {
        alert('Product Details Update Successfully');
        //this.modalService.dismissAll();
        console.log(res);
      },
      (error) => {
        // this.router.navigate(['login']);
        console.log(error);
      }
    );
  }

  deleteProductDetail(productDetail) {
    let result = confirm('Do you want to delete this detail?');
    if (result) {
      this.productService
        .DeleteProductDetail(productDetail.itemDetailId)
        .subscribe(
          (res) => {
            let itemDetail = this.itemDetails.find(
              (o) => o.itemDetailId !== productDetail.itemDetailId
            );

            this.itemDetails = [];
            this.itemDetails.push(itemDetail);
            this.getProducts();
            alert('Product Detail Delete Successfully');
            //this.modalService.dismissAll();
            console.log(res);
          },
          (error) => {
            // this.router.navigate(['login']);
            console.log(error);
          }
        );
    }
  }

  EditProduct(product, content) {
    this.formProduct.itemName = product.itemName;
    this.formProduct.companyId = product.companyId;
    this.formProduct.categoryId = product.categoryId;
    let subCategory = this.categories.find(
      (el) => el.categoryId == product.categoryId
    );
    this.subCategories = subCategory.subCategories;

    this.formProduct.subCategoryId = product.subCategoryId;
    this.formProduct.productStatus = product.isActive;
    this.formProduct.itemId = product.itemId;

    this.modalContent.modalTitle = 'Edit';
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

  ViewProductImages(content, product) {
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
    this.itemImages = product.images;
  }

  onSubmitDelete() {
    this.productService.DeleteProduct(this.formProduct.itemId).subscribe(
      (res) => {
        this.getProducts();

        alert('Product Delete Successfully');
        this.modalService.dismissAll();

        console.log(res);
      },
      (error) => {
        // this.router.navigate(['login']);
        console.log(error);
      }
    );
  }

  DeleteProduct(product, content) {
    this.modalContent.modalTitle = 'Delete';
    this.modalContent.modalBodyTitle = 'Product';

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

    this.formProduct.itemId = product.itemId;
  }

  UploadProductImages(content, product) {
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
    this.formProduct.itemId = product.itemId;
  }

  selectFiles(event) {
    this.selectedFiles = event.target.files;
  }
  onUploadImage() {
    var files = this.selectedFiles;

    this.productService.UploadImages(this.formProduct.itemId, files).subscribe(
      (res) => {
        alert(res.message);
      },
      (error) => {
        // this.router.navigate(['login']);
        console.log(error);
      }
    );
    console.log(this.formProduct.itemId);
  }

  onImageDelete(imageId) {
    let result = confirm('Do you want to delete this image?');
    if (result) {
      console.log(this.itemImages);

      // console.log(this.itemImages);
      this.productService.DeleteImage(imageId).subscribe(
        (res) => {
          let itemImage = this.itemImages.filter((o) => o.imageId !== imageId);
          console.log(itemImage);
          if (itemImage === undefined) {
            itemImage = [];
          }
          this.itemImages = [];
          for (var i = 0; i < itemImage.length; i++) {
            this.itemImages.push(itemImage[i]);
          }
          this.getProducts();
          alert('Image Delete Successfully');
        },
        (error) => {
          // this.router.navigate(['login']);
          console.log(error);
        }
      );
    }
  }
}
