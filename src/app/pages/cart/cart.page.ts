import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastController } from '@ionic/angular';

interface CartItem {
  id: number;
  title: string;
  description?: string;
  price: number;
  image?: string;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class CartPage implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(
    private cartService: CartService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadCartItems();
  }

  async loadCartItems() {
    const items = await this.cartService.getCartItems();
    this.cartItems = items.map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));
    this.calculateTotal();
  }

  async increaseQuantity(item: CartItem) {
    item.quantity++;
    await this.updateCart();
  }

  async decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      await this.updateCart();
    }
  }

  async removeFromCart(item: CartItem) {
    this.cartItems = this.cartItems.filter(i => i.id !== item.id);
    await this.updateCart();
    this.presentToast('Producto eliminado del carrito');
  }

  private async updateCart() {
    await this.cartService.updateCartItems(this.cartItems);
    this.calculateTotal();
  }

  private calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0);
  }

  async checkout() {
    // Aquí iría la lógica de checkout
    this.presentToast('Función de pago en desarrollo');
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'primary'
    });
    toast.present();
  }
}