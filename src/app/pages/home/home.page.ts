import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { FormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

interface Producto {
  id: number;
  title: string;
  description?: string;
  price: number;
  image?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, FormsModule]
})
export class HomePage implements OnInit {
  productos: Producto[] = [];
  filteredProducts: Producto[] = [];
  isDarkMode: boolean = false;
  searchTerm: string = '';
  sortOrder: string = 'default';
  cartItemCount: number = 0;
  page: number = 1;
  loading: boolean = false;

  constructor(
    private apiService: ApiService,
    private cartService: CartService,
    private themeService: ThemeService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.themeService.isDarkMode().subscribe(isDark => {
      this.isDarkMode = isDark;
    });
    this.updateCartItemCount();
  }

  async loadProducts() {
    if (this.loading) return;
    this.loading = true;

    try {
      const data = await this.apiService.getProductos().toPromise();
      this.productos = data || [];
      this.filteredProducts = [...this.productos];
      this.applyFilters();
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      this.loading = false;
    }
  }

  searchProducts() {
    this.applyFilters();
  }

  sortProducts() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.productos];

    // Aplicar búsqueda
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(term) ||
        product.description?.toLowerCase().includes(term)
      );
    }

    // Aplicar ordenamiento
    switch (this.sortOrder) {
      case 'priceAsc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        filtered.sort((a, b) => a.id - b.id);
    }

    this.filteredProducts = filtered;
  }

  async addToCart(producto: any) {
    await this.cartService.addToCart(producto);
    this.updateCartItemCount();
    this.presentToast('Producto agregado');
  }

  async updateCartItemCount() {
    const items = await this.cartService.getCartItems();
    this.cartItemCount = items.length;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      position: 'top',
      color: 'primary',
      cssClass: 'custom-toast',
      buttons: [
        {
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    toast.present();
  }

  showProductDetails(producto: any) {
    // Por ahora solo mostraremos un toast con los detalles
    this.presentToast(`${producto.title} - ${producto.price}USD`);
    // Aquí posteriormente podemos agregar navegación a una página de detalles
  }

  loadMore(event: any) {
    setTimeout(() => {
      // Aquí simularemos cargar más productos
      // En una implementación real, cargarías la siguiente página de la API
      event.target.complete();

      // Si no hay más productos para cargar
      if (this.filteredProducts.length >= 50) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
