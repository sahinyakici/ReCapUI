import {Component, OnInit} from '@angular/core';
import {CartService} from 'src/app/services/cart.service';
import {CartItem} from "../../models/cartItem";
import {Product} from "../../models/product";

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {
  carItems: CartItem[] = [];

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.carItems = this.cartService.listCar()
  }

  removeFromCart(procut: Product) {
    this.cartService.removeFromCart(procut);
  }
}
