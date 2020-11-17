import { Category } from './../models/category';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from './../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories = {};
  subCategories = [];
  formCat: any = {};
  formSubCat: any = {};
  categoryInfo: Category;
  subCategoryInfo = [];
  modalContent = {
    modalTitle: '',
  };

  constructor(
    private categoryService: CategoryService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categories = [];
    this.categoryService.getCategories().subscribe(
      (res) => {
        this.categories = res;

        setTimeout(() => {
          $('#tbl_category').DataTable();
        }, 500);
      },
      (error) => {
        console.log(error);
        this.router.navigate(['login']);
      }
    );
  }

  AddCategory(content) {
    this.modalContent.modalTitle = 'Add';
    this.formCat = {};
    this.formCat.categoryStatus = 1;
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
  onSubmitCategory() {
    if (this.formCat.categoryId === undefined) {
      this.categoryInfo = new Category();
      this.categoryInfo.categoryType = this.formCat.categoryType;
      this.categoryInfo.isActive = this.formCat.categoryStatus;

      this.categoryService.AddCategory(this.categoryInfo).subscribe(
        (data) => {
          //console.log(data);
          this.modalService.dismissAll();
          $('#tbl_category').DataTable().destroy();
          this.getCategories();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      // this.categoryInfo = new Category();
      // this.categoryInfo.categoryType = this.formCat.categoryType;
      // this.categoryInfo.isActive = this.formCat.categoryStatus;
      // this.categoryInfo.categoryId = this.formCat.categoryId;
      //this.categoryInfo.subCategories = this.subCategories;
      let newCat = {
        categoryId: this.formCat.categoryId,
        categoryType: this.formCat.categoryType,
        isActive: this.formCat.categoryStatus,
      };
      //console.log(newCat);
      this.categoryService.UpdateCategory(newCat).subscribe(
        (data) => {
          //console.log(data);
          this.modalService.dismissAll();
          $('#tbl_category').DataTable().destroy();
          this.getCategories();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  EditCategory(content, category) {
    this.modalContent.modalTitle = 'Edit';
    this.formCat.categoryType = category.categoryType;
    this.formCat.categoryStatus = category.isActive;
    this.formCat.categoryId = category.categoryId;
    this.subCategories = category.subCategories;
    console.log(this.subCategories);
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

  AddSubCategory(content, category) {
    this.modalContent.modalTitle = 'Add';
    this.formSubCat = {};
    this.formSubCat.categoryIdSub = category.categoryId;
    this.formSubCat.subCategoryStatus = 1;
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

  onSubmitSubCategory() {
    console.log(this.formSubCat.subCategoryId);
    if (this.formSubCat.subCategoryId === undefined) {
      this.categoryInfo = new Category();
      this.categoryInfo.categoryId = this.formSubCat.categoryIdSub;
      let newSubCat = {
        subCategoryType: this.formSubCat.subCategoryType,
        isActive: this.formSubCat.subCategoryStatus,
      };
      this.subCategoryInfo.push(newSubCat);

      this.categoryInfo.subCategories = this.subCategoryInfo;

      this.categoryService.AddSubCategory(this.categoryInfo).subscribe(
        (data) => {
          //console.log(data);
          this.modalService.dismissAll();
          $('#tbl_category').DataTable().destroy();
          this.getCategories();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.categoryInfo = new Category();
      this.categoryInfo.categoryId = this.formSubCat.categoryIdSub;
      let newSubCat = {
        subCategoryId: this.formSubCat.subCategoryId,
        subCategoryType: this.formSubCat.subCategoryType,
        isActive: this.formSubCat.subCategoryStatus,
      };
      this.subCategoryInfo.push(newSubCat);

      this.categoryInfo.subCategories = this.subCategoryInfo;
      console.log(this.categoryInfo);
      this.categoryService.UpdateSubCategory(this.categoryInfo).subscribe(
        (data) => {
          //console.log(data);
          this.modalService.dismissAll();
          $('#tbl_category').DataTable().destroy();
          this.getCategories();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  DeleteCategory(content, category) {
    this.modalContent.modalTitle = 'Category';
    this.formCat.idToDelete = category.categoryId;
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
  onSubmitDelete() {
    if (this.modalContent.modalTitle == 'Category') {
      this.categoryService.DeleteCategory(this.formCat.idToDelete).subscribe(
        (data) => {
          //console.log(data);
          this.modalService.dismissAll();
          $('#tbl_category').DataTable().destroy();
          this.getCategories();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  EditSubCategory(content, category) {
    this.modalContent.modalTitle = 'Edit';
    this.formSubCat.categoryIdSub = category.categoryId;
    this.formSubCat.subCategoryId = category.subCategoryId;
    this.formSubCat.subCategoryType = category.subCategoryType;
    this.formSubCat.subCategoryStatus = category.isActive;
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
}
