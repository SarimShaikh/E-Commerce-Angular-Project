import { Router } from '@angular/router';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rental-items',
  templateUrl: './rental-items.component.html',
  styleUrls: ['./rental-items.component.scss'],
})
export class RentalItemsComponent implements OnInit {
  items = [];
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.productService.getRentailItems().subscribe(
      (res) => {
        this.items = res;
        console.log(res);

        setTimeout(() => {
          $('#tbl_rentalItems').DataTable({
            ordering: false,
          });
        }, 500);
      },
      (error) => {
        this.router.navigate(['login']);

        //console.log(error);
      }
    );
  }

  returnProduct(rentalId) {
    let result = confirm('Do you want to return this product?');
    if (result) {
      $('#tbl_rentalItems').DataTable().destroy();
      this.productService.returnItem(rentalId).subscribe(
        (res) => {
          this.items = this.items.filter((x) => x.rentalId !== rentalId);

          setTimeout(() => {
            $('#tbl_rentalItems').DataTable({
              ordering: false,
            });
          }, 500);
        },
        (error) => {
          this.router.navigate(['login']);

          console.log(error);
        }
      );
    }
  }
}
