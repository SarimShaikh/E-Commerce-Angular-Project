import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-product-inventory',
  templateUrl: './product-inventory.component.html',
  styleUrls: ['./product-inventory.component.css'],
})
export class ProductInventoryComponent implements OnInit {
  productInv = [];
  quantityInput: any = {};
  result = [];
  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit() {
    this.getInventory();
  }

  getInventory() {
    this.productInv = [];
    this.productService.getInventory().subscribe(
      (res) => {
        // this.productInv = res;
        this.result = res;
        console.log(res);
        //console.log(this.productInv);
        for (var i = 0; i < this.result.length; i++) {
          let product = {
            inventoryId: this.result[i].inventoryId,
            itemId: this.result[i].itemId,
            itemDetailId: this.result[i].itemDetailId,
            companyName: this.result[i].companyName,
            itemName: this.result[i].itemName,
            itemSize: this.result[i].itemSize,
            itemPrice: this.result[i].itemPrice,
            fineAmount: this.result[i].fineAmount,
            rentalDays: this.result[i].rentalDays,
            availableQuan: this.result[i].availableQuan,
            editable: false,
          };

          this.productInv.push(product);
        }

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

  UpdateQuantity(product) {
    product.editable = !product.editable;
  }

  onCancel(product) {
    product.editable = !product.editable;
  }
  onDone(product) {
    let inv = {
      inventoryId: product.inventoryId,
      itemId: product.itemId,
      itemDetailId: product.itemDetailId,
      availableQuan: product.availableQuan,
    };

    this.productService.UpdateInventory(inv).subscribe(
      (res) => {
        this.getInventory();

        alert('Inventory Updated Successfully');
      },
      (error) => {
        console.log(error);
        //this.router.navigate(['login']);
      }
    );
  }
}
