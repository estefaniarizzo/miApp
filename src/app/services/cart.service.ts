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
    console.log('Storage initialized');
  }

  async addToCart(item: any) {
    try {
      if (!this._storage) {
        await this.init();
      }
      const cartItems = await this._storage?.get('cart') || [];
      cartItems.push(item);
      await this._storage?.set('cart', cartItems);
      console.log('Item added to cart:', item);
      console.log('Current cart items:', cartItems);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  }

  async getCartItems() {
    try {
      if (!this._storage) {
        await this.init();
      }
      const items = await this._storage?.get('cart') || [];
      console.log('Retrieved cart items:', items);
      return items;
    } catch (error) {
      console.error('Error getting cart items:', error);
      return [];
    }
  }

  async clearCart() {
    try {
      if (!this._storage) {
        await this.init();
      }
      await this._storage?.remove('cart');
      console.log('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  }
}