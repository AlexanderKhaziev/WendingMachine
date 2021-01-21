import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Coin } from '../coin';

@Injectable()
export class CoinService {

  private url = "api/coins";

  constructor(private http: HttpClient) { }

  getCoins() {
    return this.http.get(this.url);
  }

  updateCoin(coin: Coin) {
    return this.http.put(this.url, coin);
  }

}
