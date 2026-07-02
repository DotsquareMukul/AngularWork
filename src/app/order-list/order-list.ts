import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataTable, TableAction, TableColumn } from '../../shared/data-table/data-table';
import { Order } from '../service/order';
import { AppStore } from '../app.store';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, DataTable],
  templateUrl: './order-list.html',
  styleUrls: ['./order-list.css'],
})
export class OrderListComponent implements OnInit {
  columns: TableColumn[] = [
    { key: 'customerName', label: 'Customer', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'subtotal', label: 'Subtotal' },
    { key: 'tax', label: 'Tax' },
    { key: 'total', label: 'Grand Total', sortable: true },
  ];

  actions: TableAction[] = [
    { label: 'Delete', type: 'delete' },
    { label: 'Edit', type: 'edit' },
  ];

  constructor(
    private router: Router,
    private store: AppStore,
  ) {}

  ngOnInit() {
    this.store.loadOrders();
  }

  get orders(): Order[] {
    return this.store.orders();
  }

  get loading(): boolean {
    return this.store.loadingOrders();
  }

  onAction(event: { type: string; row: Order }) {
    if (event.type === 'delete') {
      this.store.deleteOrder(event.row.id);
    } else if (event.type === 'edit') {
      this.router.navigate(['/order-form', event.row.id]);
    }
  }

  goToAddOrder() {
    this.router.navigate(['/order-form']);
  }
}
