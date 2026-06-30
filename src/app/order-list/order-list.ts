import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataTable, TableAction, TableColumn } from '../../shared/data-table/data-table';
import { Order, OrderService } from '../service/order';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, DataTable],
  templateUrl: './order-list.html',
  styleUrls: ['./order-list.css'],
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];

  columns: TableColumn[] = [
    { key: 'customerName', label: 'Customer', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'subtotal', label: 'Subtotal' },
    { key: 'tax', label: 'Tax' },
    { key: 'grandTotal', label: 'Grand Total', sortable: true },
  ];

  actions: TableAction[] = [
    { label: 'Delete', type: 'delete' },
    { label: 'view', type: 'view' },
    { label: 'Edit', type: 'edit' },
  ];

  constructor(
    private orderService: OrderService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe((data) => {
      this.orders = data;
    });
  }

  onAction(event: { type: string; row: Order }) {
    if (event.type === 'delete') {
      this.orderService.deleteOrder(event.row.id);
    } else if (event.type === 'edit') {
      this.router.navigate(['/order-form', event.row.id]);
    }
  }

  goToAddOrder() {
    this.router.navigate(['/order-form']);
  }
}
