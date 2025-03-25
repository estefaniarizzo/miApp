import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class CartPage implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  async ngOnInit() {
    this.cartItems = await this.cartService.getCartItems();
  }

  async clearCart() {
    await this.cartService.clearCart();
    this.cartItems = [];
  }
}