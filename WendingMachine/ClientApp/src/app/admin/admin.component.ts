import { Component, OnInit } from '@angular/core';
import { CoinService } from '../services/coin.service';
import { ProductService } from '../services/product.service';
import { Coin } from '../coin';
import { Product } from '../product';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [CoinService, ProductService]
})
export class AdminComponent implements OnInit {

  product: Product = new Product();   // изменяемый товар
  products: Product[];                // массив товаров

  coin: Coin = new Coin();            // изменяемая монета
  coins: Coin[];                      // массив монет
  tableMode: boolean = true;          // табличный режим

  constructor(private coinService: CoinService, private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
    this.loadCoins();
  }
  
  loadProducts() {
    this.productService.getProducts()
      .subscribe((data: Product[]) => this.products = data);
  }

  loadCoins() {
    this.coinService.getCoins()
      .subscribe((data: Coin[]) => this.coins = data);
  }
  
  save() {
    this.product.price = parseInt(this.product.price);
    if (this.product.id == null) {
      console.log("new product", this.product);
      
      this.productService.createProduct(this.product)
        .subscribe((data: Product) => this.products.push(data));
    } else {
      this.productService.updateProduct(this.product)
        .subscribe(data => this.loadProducts());
    }
    this.cancel();
  }
  editProduct(p: Product) {
    this.product = p;
  }
  cancel() {
    this.product = new Product();
    this.tableMode = true;
  }
  delete(p: Product) {
    this.productService.deleteProduct(p.id)
      .subscribe(data => this.loadProducts());
  }
  add() {
    this.cancel();
    this.tableMode = false;
  }

  toggleActive(c: Coin) {
    this.coin = c;
    this.coin.active = !this.coin.active;
    this.coinService.updateCoin(this.coin)
      .subscribe(data => this.loadCoins());
  }
}
