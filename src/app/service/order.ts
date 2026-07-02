import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  private orders: Order[] = [];
  private orders$ = new BehaviorSubject<Order[]>(this.orders);

  getOrders() {
    return this.orders$.asObservable();
  }
  updateOrder(id: string, updated: Omit<Order, 'id'>) {
    this.orders = this.orders.map((o) => (o.id === id ? { ...updated, id } : o));
    this.orders$.next(this.orders);
  }

  getOrderById(id: string): Order | undefined {
    return this.orders.find((o) => o.id === id);
  }

  addOrder(order: Omit<Order, 'id'>) {
    const newOrder: Order = { ...order, id: String(Date.now()) };
    this.orders = [...this.orders, newOrder];
    this.orders$.next(this.orders);
  }

  deleteOrder(id: string) {
    this.orders = this.orders.filter((o) => o.id !== id);
    this.orders$.next(this.orders);
  }
}
