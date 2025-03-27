import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface Producto {
  id: number;
  title: string;
  description?: string;
  price: number;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private productos: Producto[] = [
    {
      id: 1,
      title: 'Smartphone XYZ',
      description: 'Último modelo con 256GB de almacenamiento',
      price: 899.99,
      image: 'https://picsum.photos/200/300?random=1'
    },
    {
      id: 2,
      title: 'Laptop Pro',
      description: 'Perfecta para trabajo y gaming',
      price: 1299.99,
      image: 'https://picsum.photos/200/300?random=2'
    },
    {
      id: 3,
      title: 'Smartwatch Sport',
      description: 'Resistente al agua, monitor cardíaco',
      price: 299.99,
      image: 'https://picsum.photos/200/300?random=3'
    },
    {
      id: 4,
      title: 'Auriculares Bluetooth',
      description: 'Cancelación de ruido activa',
      price: 199.99,
      image: 'https://picsum.photos/200/300?random=4'
    },
    {
      id: 5,
      title: 'Tablet Ultra',
      description: 'Perfecta para creativos',
      price: 649.99,
      image: 'https://picsum.photos/200/300?random=5'
    },
    {
      id: 6,
      title: 'Cámara 4K',
      description: 'Ideal para fotografía profesional',
      price: 799.99,
      image: 'https://picsum.photos/200/300?random=6'
    },
    {
      id: 7,
      title: 'Consola Gaming',
      description: 'La mejor experiencia de juego',
      price: 499.99,
      image: 'https://picsum.photos/200/300?random=7'
    },
    {
      id: 8,
      title: 'Monitor Gaming',
      description: '144Hz, 1ms respuesta',
      price: 349.99,
      image: 'https://picsum.photos/200/300?random=8'
    },
    {
      id: 9,
      title: 'Teclado Mecánico',
      description: 'Switches RGB personalizables',
      price: 129.99,
      image: 'https://picsum.photos/200/300?random=9'
    },
    {
      id: 10,
      title: 'Mouse Gaming',
      description: 'Sensor óptico de alta precisión',
      price: 79.99,
      image: 'https://picsum.photos/200/300?random=10'
    }
  ];

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return of(this.productos); // Retornamos los productos de ejemplo
  }
}