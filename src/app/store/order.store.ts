import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { TAX_RATE } from '../utils/MockData';
import { Order, OrderService } from '../service/order';
import { NotificationService } from '../service/notification.service';
import { ORDER_MESSAGES } from '../utils/toast-messages';

@Injectable({ providedIn: 'root' })
export class OrderStore {
  private orderService = inject(OrderService);
  private notify = inject(NotificationService);

  orders = signal<Order[]>([]);
  taxRate = TAX_RATE;

  loadingOrders = signal(false);
  ordersError = signal<string | null>(null);

  totalOrders = computed(() => this.orders().length);
  totalRevenue = computed(() => this.orders().reduce((sum, o: any) => sum + (o.total ?? 0), 0));

  private extractMessage(err: HttpErrorResponse): string {
    return err.error?.message || err.message || 'Something went wrong';
  }

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
}
