import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataTable, TableAction, TableColumn } from '../shared/data-table/data-table';
import { Order } from '../service/order';
import { OrderStore } from '../store/order.store';
import { ConfirmDialogComponent } from '../shared/confirm-dialuge/confirm-dialuge';
import { MatDialog } from '@angular/material/dialog';

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
    { label: 'view', type: 'view' },
  ];

  constructor(
    private router: Router,
    private orderStore: OrderStore,
  ) {}
  private dialog = inject(MatDialog);
  ngOnInit() {}

  get orders(): Order[] {
    return this.orderStore.orders();
  }

  get loading(): boolean {
    return this.orderStore.loadingOrders();
  }

  onAction(event: { type: string; row: Order }) {
    if (event.type === 'delete') {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Delete Order',
          message: 'This action cannot be undone.',
          confirmLabel: 'Delete',
          cancelLabel: 'Cancel',
        },
      });
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result === true) {
          this.orderStore.deleteOrder(event.row.id);
        }
      });
    } else if (event.type === 'edit') {
      this.router.navigate(['/order-form', event.row.id]);
    } else if (event.type === 'view') {
      this.router.navigate(['/order-detail', event.row.id]);
    }
  }

  goToAddOrder() {
    this.router.navigate(['/order-form']);
  }
}
