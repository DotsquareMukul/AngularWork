import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PRODUCTS, TAX_RATE } from '../utils/MockData';
import { Customer } from './service/cutomer';
import { Order } from './service/order';

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface OrderLineItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  total: number;
}

@Injectable({ providedIn: 'root' })
export class AppStore {
  private http = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:5001/api'; // swap for your real API later

  // ---------- STATE ----------
  customers = signal<Customer[]>([]);
  orders = signal<Order[]>([]);
  products = signal<Product[]>([]);
  taxRate = TAX_RATE;

  loadingCustomers = signal(false);
  loadingOrders = signal(false);

  // ---------- COMPUTED ----------
  totalCustomers = computed(() => this.customers().length);
  totalOrders = computed(() => this.orders().length);
  totalRevenue = computed(() => this.orders().reduce((sum, o) => sum + o.total, 0));

  // ---------- CUSTOMER API CALLS ----------
  loadCustomers() {
    this.loadingCustomers.set(true);
    this.http.get<any>(`${this.baseUrl}/customers`).subscribe({
      next: (data) => {
        const resultdata: any = data.data;
        console.log(resultdata);
        const mapped: Customer[] = resultdata.map((u: any) => ({
          id: u.id,
          firstName: u.name.split(' ')[0],
          lastName: u.name.split(' ')[1] || '',
          email: u.email,
          phone: u.phone,
          address: u.address || '',
          city: u.city || '',
          zip: u.address?.zipcode || '',
        }));
        console.log(mapped);
        this.customers.set(mapped);
        console.log(this.customers(), 'customeres');
        this.loadingCustomers.set(false);
      },
      error: (err) => {
        console.error('Failed to load customers', err);
        this.loadingCustomers.set(false);
      },
    });
  }

  getCustomerById(id: string): Customer | undefined {
    console.log(id, 'sdff');

    return this.customers().find((c) => c.id === id);
  }

  addCustomer(customer: Omit<Customer, 'id'>) {
    const { firstName, lastName, ...rest } = customer;
    const cutomerpayload = { ...rest, name: firstName + ' ' + lastName };
    this.http.post<any>(`${this.baseUrl}/customers`, cutomerpayload).subscribe({
      next: (created) => {
        const { name, ...rest } = created;
        const addNewCustomer = {
          ...rest,
          firstName: name.split(' ')[0],
          lastName: name.split(' ')[1] || '',
        };
        this.customers.update((list) => [...list, ...addNewCustomer]);
      },
      error: (err) => console.error('Failed to add customer', err),
    });
  }

  updateCustomer(id: string, updated: Omit<Customer, 'id'>) {
    this.http.put<any>(`${this.baseUrl}/customers/${id}`, updated).subscribe({
      next: () => {
        this.customers.update((list) => list.map((c) => (c.id === id ? { ...updated, id } : c)));
      },
      error: (err) => console.error('Failed to update customer', err),
    });
  }

  deleteCustomer(id: string) {
    this.http.delete(`${this.baseUrl}/customers/${id}`).subscribe({
      next: () => {
        this.customers.update((list) => list.filter((c) => c.id !== id));
      },
      error: (err) => console.error('Failed to delete customer', err),
    });
  }

  // ---------- ORDER API CALLS ----------
  // JSONPlaceholder has no "orders" resource, so we map onto /posts as a stand-in
  loadOrders() {
    this.loadingOrders.set(true);

    this.http.get<any>(`${this.baseUrl}/orders`).subscribe({
      next: (result) => {
        console.log(result.data);
        this.orders.set(result.data);
        this.loadingOrders.set(false);
      },
      error: (err) => {
        console.error('Failed to load orders', err);
        this.loadingOrders.set(false);
      },
    });
  }

  getOrderById(id: string): Order | undefined {
    console.log(id, 'hjvjhv');
    return this.orders().find((o) => o.id === id);
  }

  addOrder(order: Omit<Order, 'id'>) {
    this.http.post<any>(`${this.baseUrl}/orders`, order).subscribe({
      next: (created) => {
        console.log(created.data);
        const newOrder = created.data;
        this.orders.update((list) => [newOrder, ...list]);
      },
      error: (err) => console.error('Failed to add order', err),
    });
  }

  updateOrder(id: string, updated: Omit<Order, 'id'>) {
    this.http.put<any>(`${this.baseUrl}/order/${id}`, updated).subscribe({
      next: () => {
        this.orders.update((list) => list.map((o) => (o.id === id ? { ...updated, id } : o)));
      },
      error: (err) => console.error('Failed to update order', err),
    });
  }

  deleteOrder(id: string) {
    this.http.delete(`${this.baseUrl}/orders/${id}`).subscribe({
      next: () => {
        this.orders.update((list) => list.filter((o) => o.id !== id));
      },
      error: (err) => console.error('Failed to delete order', err),
    });
  }

  // ---------- PRODUCTS ----------
  // keep products local for now since there's no real product backend
  loadProducts() {
    this.products.set(PRODUCTS);
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products().find((p) => p.id === id);
  }
}
