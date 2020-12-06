import { ViewproductsService } from './../services/viewproducts.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  items = [];
  totalAmount = 0;
  NoOfItems = 0;
  modeOfPay = 'Online';

  orderDetailDTO = [];
  paymentDTO = {
    paymentType: '',
    amount: 0,
  };

  orderObject = {
    userId: 0,
    paymentDTO: {},
    orderDetailDTO: [],
  };

  constructor(
    private viewproductService: ViewproductsService,
    private router: Router
  ) {}

  ngOnInit() {
    let item = window.localStorage.getItem('OrderDetails');
    if (item !== undefined || item !== null) {
      this.items = JSON.parse(item);
      this.NoOfItems = this.items.length;
      for (var i = 0; i < this.items.length; i++) {
        this.totalAmount += this.items[i].price * this.items[i].quantity;
      }
    }
  }
  onPaySubmit() {
    let userId = parseInt(sessionStorage.getItem('userId'));
    console.log(userId);
    if (isNaN(userId)) {
      alert('Please Login to do payment!');
      return;
    }

    if (this.items.length > 0) {
      for (var i = 0; i < this.items.length; i++) {
        let orderDetail = {
          itemId: this.items[i].itemId,
          itemDetailId: this.items[i].itemDetailId,
          price: this.items[i].price,
          quantity: this.items[i].quantity,
          fromDate: this.items[i].fromDate,
          toDate: this.items[i].toDate,
        };
        this.orderDetailDTO.push(orderDetail);
      }

      this.paymentDTO.paymentType = this.modeOfPay;
      this.paymentDTO.amount = this.totalAmount;

      this.orderObject.userId = userId;
      this.orderObject.paymentDTO = this.paymentDTO;
      this.orderObject.orderDetailDTO = this.orderDetailDTO;

      console.log(this.orderObject);
      this.viewproductService.SubmitOrder(this.orderObject).subscribe(
        (res) => {
          alert(res.message);
          window.localStorage.setItem('OrderDetails', null);
          setTimeout(() => {
            window.location.href = '';
          }, 1000);
        },
        (error) => {
          //this.router.navigate(['login']);
          console.log(error);
        }
      );
    }
  }
}
