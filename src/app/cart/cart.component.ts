import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items = [];
  constructor() {}

  ngOnInit() {
    let items = window.localStorage.getItem('CartItems');
    if (items !== undefined || items !== null) {
      this.items = JSON.parse(items);
      console.log(this.items);
    }
  }
}
