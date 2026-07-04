import { Component, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../service/cutomer';
import { DataTable, TableAction, TableColumn } from '../shared/data-table/data-table';
import { CustomerStore } from '../store/customer.store';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, FormsModule, DataTable],
  templateUrl: './customer-list.html',
  styleUrls: ['./customer-list.css'],
})
export class CustomerListComponent implements OnInit {
  filteredCustomers: Customer[] = [];
  searchTerm = '';

  columns: TableColumn[] = [
    { key: 'firstName', label: 'First Name', sortable: true },
    { key: 'lastName', label: 'Last Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phone', label: 'Phone' },
    { key: 'city', label: 'City', sortable: true },
  ];

  actions: TableAction[] = [{ label: 'Delete', type: 'delete' }];

  constructor(
    private customerStore: CustomerStore,
    private router: Router,
  ) {
    effect(() => {
      this.applyFilter();
    });
  }

  ngOnInit() {
    this.customerStore.loadCustomers();
  }

  get loading(): boolean {
    return this.customerStore.loadingCustomers();
  }
  get customers(): Customer[] {
    return this.customerStore.customers();
  }
  applyFilter() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredCustomers = this.customerStore.customers();
      console.log(this.customerStore.customers());
      return;
    }
    this.filteredCustomers = this.customerStore.customers().filter((customer) =>
      this.columns.some((col) => {
        const value = (customer as any)[col.key];
        return value && value.toString().toLowerCase().includes(term);
      }),
    );
  }

  onAction(event: { type: string; row: Customer }) {
    if (event.type === 'delete') {
      this.customerStore.deleteCustomer(event.row.id);
    }
  }

  goToAddCustomer() {
    this.router.navigate(['/customer-form']);
  }
}
