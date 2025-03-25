import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class HomePage implements OnInit {
  productos: any[] = [];

  constructor(private apiService: ApiService, private cartService: CartService) {}

  ngOnInit() {
    this.apiService.getProductos().subscribe((data: any) => {
      this.productos = data;
    });
  }

  addToCart(producto: any) {
    this.cartService.addToCart(producto);
    alert("Producto añadido al carrito!");
  }
}