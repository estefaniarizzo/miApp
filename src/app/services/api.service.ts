import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';  // API de prueba

  constructor(private http: HttpClient) {}

  getProductos() {
    return this.http.get(`${this.apiUrl}/posts?_limit=10`);  // Mock de productos
  }
}