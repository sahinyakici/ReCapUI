import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {ToastrService} from "ngx-toastr";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  dataLoaded: boolean = false;
  filterText = "";

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private toastrService: ToastrService, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["categoryId"]) {
        this.getProductsByCategory(params["categoryId"])
      } else {
        this.getProducts();
      }
    })
  }

  getProducts() {
    this.productService.getProducts().subscribe(response => {
      this.products = response.data
      this.dataLoaded = true;
    })
  }

  getProductsByCategory(categoryId: number) {
    this.productService.getProductsByCategory(categoryId).subscribe(response => {
      this.products = response.data
      this.dataLoaded = true;
    })
  }

  addToCart(product: Product) {
    if (product.unitsInStock <= 0) {
      this.toastrService.error("Bu ürün sepete eklenemez", "HATA")
    } else {
      this.cartService.addToCart(product)
      this.toastrService.success("Sepete eklendi", product.productName)
    }
  }
}
