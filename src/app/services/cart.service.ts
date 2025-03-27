import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

interface CartItem {
  id: number;
  title: string;
  description?: string;
  price: number;
  image?: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _storage: Storage | null = null;
  private readonly CART_KEY = 'cart_items';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async getCartItems(): Promise<CartItem[]> {
    if (!this._storage) await this.init();
    const items = await this._storage?.get(this.CART_KEY) || [];
    return items;
  }

  async addToCart(product: CartItem) {
    const items = await this.getCartItems();
    const existingItem = items.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      items.push({ ...product, quantity: 1 });
    }

    await this._storage?.set(this.CART_KEY, items);
  }

  async updateCartItems(items: CartItem[]) {
    if (!this._storage) await this.init();
    await this._storage?.set(this.CART_KEY, items);
  }

  async clearCart() {
    if (!this._storage) await this.init();
    await this._storage?.set(this.CART_KEY, []);
  }
}