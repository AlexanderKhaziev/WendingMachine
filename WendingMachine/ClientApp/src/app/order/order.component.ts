import { Component, OnInit } from '@angular/core';
import { CoinService } from '../services/coin.service';
import { ProductService } from '../services/product.service';
import { Product } from '../product';
import { Coin } from '../coin';

interface Order {
  id?: number,
  name?: string,
  count?: number
}

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [ProductService, CoinService]
})

export class OrderComponent implements OnInit {

  amount: number = 0;
  orderAmount: number = 0;
  coins: Coin[];
  products: Product[];
  product: Product = new Product();
  text: string = "";

  orders: Order[] = [];

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

  addItemToOrder(product: Product) {
    if (this.amount - product.price >= 0) {
      this.product = this.products.find(p => p.id === product.id);
      if (this.product != null) {
        this.product.count--;
        this.productService.updateProduct(this.product)
          .subscribe(data => this.loadProducts())
        this.amount -= product.price;
        let found = false;
        if (this.orders) {
          this.orders.map(
            (p: Product) => {
              if (p.id === product.id) {
                p.count++;
                found = true;
              }
            }
          );
          if (!found) {
            const order: Order = { id: product.id, name: product.name, count: 1 }
            this.orders.push(order);
          }
        } else {
          const order: Order = { id: product.id, name: product.name, count: 1 }
          console.log(order);
          console.log(this.orders);
          this.orders.push(order);
        }
        console.log(this.orders);
        this.text = `Получить заказ${this.amount > 0 ? ' и сдачу ' + this.amount + ' у.е.' : ''}`;
      }
    }
  }

  addAmount(value: number) {
    if (this.products.length) {
      this.amount += value;
    }
  }

  getAmount() {
    return this.amount;
  }

  getOrder() {
    this.orders = [];
    this.amount = 0;
  }
}
