import {Injectable} from '@angular/core';
import {Product} from "../models/product";
import {CartItems} from "../models/cartItems";
import {CartItem} from "../models/cartItem";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private toastrService: ToastrService) {
  }

  addToCart(product: Product) {
    let item = CartItems.find(c => c.product.productId === product.productId);
    if (item)
      item.quantity += 1;
    else {
      let cartItem = new CartItem();
      cartItem.product = product;
      cartItem.quantity = 1;
      CartItems.push(cartItem);
    }
  }

  listCar(): CartItem[] {
    return CartItems;
  }

  removeFromCart(product: Product) {
    let item: CartItem | undefined = CartItems.find(c => c.product.productId === product.productId);
    if (item !== undefined) {
      if (item.quantity > 1) {
        item.quantity -= 1
        this.toastrService.success("1 ürün silindi", product.productName)
      } else {
        CartItems.splice(CartItems.indexOf(item), 1)
        this.toastrService.success("ürün silindi", product.productName)
      }
    } else {
      this.toastrService.error("Böyle bir ürün sepette yok")
    }
  }
}
