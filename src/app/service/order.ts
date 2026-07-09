import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface OrderLineItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  total: number; // price * quantity
}

export interface Order {
  id: string;
  customerId?: string;
  customerName: string;
  status: string;
  items: OrderLineItem[];
  subtotal: number;
  tax: number;
  total: number;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.baseUrl}orders`;

  getAll(): Observable<Order[]> {
    return this.http.get<any>(this.baseUrl).pipe(map((res) => res.data));
  }

  create(order: Omit<Order, 'id'>): Observable<Order> {
    return this.http.post<any>(this.baseUrl, order).pipe(map((res) => res.data));
  }

  update(id: string, order: Omit<Order, 'id'>): Observable<Order> {
    return this.http.patch<any>(`${this.baseUrl}/${id}`, order).pipe(map(() => ({ ...order, id })));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
