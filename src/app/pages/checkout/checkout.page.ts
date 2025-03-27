import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ToastController } from '@ionic/angular';

interface CheckoutForm {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  numeroTarjeta: string;
  fechaExpiracion: string;
  cvv: string;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CheckoutPage implements OnInit {
  formData: CheckoutForm = {
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    numeroTarjeta: '',
    fechaExpiracion: '',
    cvv: ''
  };

  total: number = 0;
  procesandoPago: boolean = false;

  constructor(
    private router: Router,
    private cartService: CartService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    const items = await this.cartService.getCartItems();
    this.total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  async procesarPago() {
    console.log('Datos del formulario:', this.formData);
    
    if (!this.validarFormulario()) {
      const camposFaltantes = this.obtenerCamposFaltantes();
      this.presentToast(`Por favor, complete los siguientes campos: ${camposFaltantes.join(', ')}`, 'danger');
      return;
    }

    this.procesandoPago = true;

    // Simulamos el procesamiento del pago
    setTimeout(async () => {
      this.procesandoPago = false;
      await this.presentToast('¡Pago realizado con éxito!', 'success');
      await this.cartService.clearCart();
      this.router.navigate(['/home']);
    }, 2000);
  }

  validarFormulario(): boolean {
    return Boolean(
      this.formData.nombre &&
      this.formData.email &&
      this.formData.email.includes('@') &&
      this.formData.telefono &&
      this.formData.direccion &&
      this.formData.numeroTarjeta &&
      this.formData.fechaExpiracion &&
      this.formData.cvv
    );
  }

  obtenerCamposFaltantes(): string[] {
    const campos = [];
    if (!this.formData.nombre) campos.push('Nombre');
    if (!this.formData.email || !this.formData.email.includes('@')) campos.push('Email válido');
    if (!this.formData.telefono) campos.push('Teléfono');
    if (!this.formData.direccion) campos.push('Dirección');
    if (!this.formData.numeroTarjeta) campos.push('Número de Tarjeta');
    if (!this.formData.fechaExpiracion) campos.push('Fecha de Expiración');
    if (!this.formData.cvv) campos.push('CVV');
    return campos;
  }

  formatearTarjeta(event: any) {
    let input = event.target.value.replace(/\D/g, '');
    if (input.length > 16) input = input.substr(0, 16);
    this.formData.numeroTarjeta = input;
  }

  formatearFecha(event: any) {
    let input = event.target.value.replace(/\D/g, '');
    if (input.length >= 2) {
      input = input.substr(0, 2) + '/' + input.substr(2);
    }
    if (input.length > 5) input = input.substr(0, 5);
    this.formData.fechaExpiracion = input;
  }

  formatearCVV(event: any) {
    let input = event.target.value.replace(/\D/g, '');
    if (input.length > 3) input = input.substr(0, 3);
    this.formData.cvv = input;
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: color
    });
    toast.present();
  }
}
