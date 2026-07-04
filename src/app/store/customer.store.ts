import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Customer, CustomerService } from '../service/cutomer';
import { NotificationService } from '../service/notification.service';
import { CUSTOMER_MESSAGES } from '../utils/toast-messages';

@Injectable({ providedIn: 'root' })
export class CustomerStore {
  private customerService = inject(CustomerService);
  private notify = inject(NotificationService);

  customers = signal<Customer[]>([]);
  loadingCustomers = signal(false);
  customersError = signal<string | null>(null);

  totalCustomers = computed(() => this.customers().length);

  private extractMessage(err: HttpErrorResponse): string {
    return err.error?.message || err.message || 'Something went wrong';
  }

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
}
