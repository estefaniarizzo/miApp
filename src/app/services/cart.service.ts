import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  async addToCart(item: any) {
    const cartItems = await this._storage?.get('cart') || [];
    cartItems.push(item);
    await this._storage?.set('cart', cartItems);
  }

  async getCartItems() {
    return await this._storage?.get('cart') || [];
  }

  async clearCart() {
    await this._storage?.remove('cart');
  }
}