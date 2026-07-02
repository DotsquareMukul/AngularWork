import { Component, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppStore } from '../app.store';
import { Customer } from '../service/cutomer';
import { DataTable, TableAction, TableColumn } from '../../shared/data-table/data-table';

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
    private store: AppStore,
    private router: Router,
  ) {
    effect(() => {
      this.applyFilter();
    });
  }

  ngOnInit() {
    this.store.loadCustomers();
  }

  get loading(): boolean {
    return this.store.loadingCustomers();
  }
  get customers(): Customer[] {
    return this.store.customers();
  }
  applyFilter() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredCustomers = this.store.customers();
      console.log(this.store.customers());
      return;
    }
    this.filteredCustomers = this.store.customers().filter((customer) =>
      this.columns.some((col) => {
        const value = (customer as any)[col.key];
        return value && value.toString().toLowerCase().includes(term);
      }),
    );
  }

  onAction(event: { type: string; row: Customer }) {
    if (event.type === 'delete') {
      this.store.deleteCustomer(event.row.id);
    }
  }

  goToAddCustomer() {
    this.router.navigate(['/customer-form']);
  }
}
