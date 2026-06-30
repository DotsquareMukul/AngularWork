import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Customer, CustomerService } from '../service/cutomer';
import { DataTable, TableAction, TableColumn } from '../../shared/data-table/data-table';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-list',
  imports: [CommonModule, DataTable, FormsModule],
  templateUrl: './customer-list.html',
  styleUrls: ['./customer-list.css'],
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
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
    private customerService: CustomerService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.customerService.getCustomers().subscribe((data) => {
      this.customers = data;
      this.applyFilter();
    });
  }

  onAction(event: { type: string; row: Customer }) {
    if (event.type === 'delete') {
      this.customerService.deleteCustomer(event.row.id);
    }
  }
  applyFilter() {
    const term = this.searchTerm.trim().toLowerCase();
    console.log(term);

    if (!term) {
      this.filteredCustomers = this.customers;
      return;
    }

    this.filteredCustomers = this.customers.filter((customer) =>
      this.columns.some((col) => {
        const value = (customer as any)[col.key];
        return value && value.toString().toLowerCase().includes(term);
      }),
    );
  }

  goToAddCustomer() {
    this.router.navigate(['/customer-form']);
  }
}
