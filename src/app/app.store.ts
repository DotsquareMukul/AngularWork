import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Product, PRODUCTS, TAX_RATE } from './utils/MockData';
import { Customer, CustomerService } from './service/cutomer';
import { Order, OrderService } from './service/order';
import { NotificationService } from './service/notification.service';
import { CUSTOMER_MESSAGES, ORDER_MESSAGES } from './utils/toast-messages';

@Injectable({ providedIn: 'root' })
export class AppStore {
  private customerService = inject(CustomerService);
  private orderService = inject(OrderService);
  private notify = inject(NotificationService);

  customers = signal<Customer[]>([]);
  orders = signal<Order[]>([]);
  products = signal<Product[]>([]);
  taxRate = TAX_RATE;

  loadingCustomers = signal(false);
  loadingOrders = signal(false);
  customersError = signal<string | null>(null);
  ordersError = signal<string | null>(null);

  totalCustomers = computed(() => this.customers().length);
  totalOrders = computed(() => this.orders().length);
  totalRevenue = computed(() => this.orders().reduce((sum, o: any) => sum + (o.total ?? 0), 0));

  private extractMessage(err: HttpErrorResponse): string {
    return err.error?.message || err.message || 'Something went wrong';
  }

  // ---------- CUSTOMERS ----------
  loadCustomers() {
    this.loadingCustomers.set(true);
    this.customersError.set(null);
    this.customerService.getAll().subscribe({
      next: (data) => {
        this.customers.set(data);
        this.loadingCustomers.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.customersError.set(this.extractMessage(err));
        this.loadingCustomers.set(false);
      },
    });
  }

  addCustomer(customer: Omit<Customer, 'id'>) {
    this.customerService.create(customer).subscribe({
      next: (created) => {
        this.customers.update((list) => [...list, created]);
        this.notify.success(CUSTOMER_MESSAGES.ADD_SUCCESS);
      },
      error: (err: HttpErrorResponse) => this.customersError.set(this.extractMessage(err)),
    });
  }

  updateCustomer(id: string, updated: Omit<Customer, 'id'>) {
    this.customerService.update(id, updated).subscribe({
      next: (result) => {
        this.customers.update((list) => list.map((c) => (c.id === id ? result : c)));
        this.notify.success(CUSTOMER_MESSAGES.UPDATE_SUCCESS);
      },
      error: (err: HttpErrorResponse) => this.customersError.set(this.extractMessage(err)),
    });
  }

  deleteCustomer(id: string) {
    this.customerService.delete(id).subscribe({
      next: () => {
        this.customers.update((list) => list.filter((c) => c.id !== id));
        this.notify.success(CUSTOMER_MESSAGES.DELETE_SUCCESS);
      },

      error: (err: HttpErrorResponse) => this.customersError.set(this.extractMessage(err)),
    });
  }

  getCustomerById(id: string): Customer | undefined {
    return this.customers().find((c) => c.id === id);
  }

  // ---------- ORDERS ----------
  loadOrders() {
    this.loadingOrders.set(true);
    this.ordersError.set(null);
    this.orderService.getAll().subscribe({
      next: (data) => {
        this.orders.set(data);
        this.loadingOrders.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.ordersError.set(this.extractMessage(err));
        this.loadingOrders.set(false);
      },
    });
  }

  addOrder(order: Omit<Order, 'id'>) {
    this.orderService.create(order).subscribe({
      next: (created) => {
        this.orders.update((list) => [created, ...list]);
        this.notify.success(ORDER_MESSAGES.ADD_SUCCESS);
      },
      error: (err: HttpErrorResponse) => this.ordersError.set(this.extractMessage(err)),
    });
  }

  updateOrder(id: string, updated: Omit<Order, 'id'>) {
    this.orderService.update(id, updated).subscribe({
      next: (result) => {
        this.orders.update((list) => list.map((o) => (o.id === id ? result : o)));
        this.notify.success(ORDER_MESSAGES.UPDATE_SUCCESS);
      },
      error: (err: HttpErrorResponse) => this.ordersError.set(this.extractMessage(err)),
    });
  }

  deleteOrder(id: string) {
    this.orderService.delete(id).subscribe({
      next: () => {
        this.orders.update((list) => list.filter((o) => o.id !== id));
        this.notify.success(ORDER_MESSAGES.DELETE_SUCCESS);
      },
      error: (err: HttpErrorResponse) => this.ordersError.set(this.extractMessage(err)),
    });
  }

  getOrderById(id: string): Order | undefined {
    return this.orders().find((o) => o.id === id);
  }

  // ---------- PRODUCTS ----------
  loadProducts() {
    this.products.set(PRODUCTS);
  }

  getProductById(id: number): Product | undefined {
    return this.products().find((p) => p.id === id);
  }
}
