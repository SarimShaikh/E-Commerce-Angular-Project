import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-return-items',
  templateUrl: './return-items.component.html',
  styleUrls: ['./return-items.component.scss'],
})
export class ReturnItemsComponent implements OnInit {
  items = [];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getReturnItems().subscribe(
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
        //console.log(error);
      }
    );
  }
}
