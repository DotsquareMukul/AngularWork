import { Service } from '@angular/core';

@Service()
export class Cutomer {}
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { customersData } from '../../utils/MockData';

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private customers: Customer[] = customersData;

  private customers$ = new BehaviorSubject<Customer[]>(this.customers);

  getCustomers() {
    return this.customers$.asObservable();
  }

  addCustomer(customer: Omit<Customer, 'id'>) {
    const newCustomer: Customer = { ...customer, id: String(Date.now().toString) };
    this.customers = [...this.customers, newCustomer];
    this.customers$.next(this.customers);
  }

  deleteCustomer(id: string) {
    this.customers = this.customers.filter((c) => c.id !== id);
    this.customers$.next(this.customers);
  }
}
