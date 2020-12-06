import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items = [];
  constructor(private router: Router) {}

  ngOnInit() {
    let item = window.localStorage.getItem('OrderDetails');
    if (item !== undefined || item !== null) {
      this.items = JSON.parse(item);
      console.log(this.items);
    }
  }

  onCheckout() {
    this.router.navigate(['payment']);
  }
  removeCartItem(item) {
    this.items = this.items.filter((x) => x.itemDetailId !== item.itemDetailId);

    window.localStorage.setItem('OrderDetails', JSON.stringify(this.items));
  }
}
