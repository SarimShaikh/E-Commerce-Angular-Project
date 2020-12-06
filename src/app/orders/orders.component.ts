import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orderNumber = undefined;
  orderDetails = [];
  items = [];
  page = 0;
  size = 5;
  pageNumber = 0;
  totalItems = 0;

  modalContent = {
    modalTitle: '',
  };
  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {}

  public onPageChange(pageNum): void {
    //this.page = pageNum;
    //this.size = this.size * (pageNum - 1);
    this.pageNumber = pageNum - 1;
    this.productService
      .getOrder(this.pageNumber, this.size, this.orderNumber)
      .subscribe(
        (res) => {
          console.log(res);
          this.items = res.orders;
          this.totalItems = res.totalItems;
        },
        (error) => {
          //this.router.navigate(['login']);
          console.log(error);
        }
      );
  }

  onSearchOrder(value) {
    console.log(value);
    if (value === '') {
      this.orderNumber = undefined;
    } else {
      this.orderNumber = value;
    }
    this.productService
      .getOrder(this.pageNumber, this.size, this.orderNumber)
      .subscribe(
        (res) => {
          console.log(res);
          this.items = res.orders;
          this.totalItems = res.totalItems;
        },
        (error) => {
          // this.router.navigate(['login']);
          console.log(error);
        }
      );
  }

  ViewOrderDetail(item, content) {
    this.modalContent.modalTitle = 'Order#' + item.orderNumber;
    this.orderDetails = item.orderDetails;
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
