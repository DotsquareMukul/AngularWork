import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Order } from '../service/order';
import { OrderStore } from '../store/order.store';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
  ],
  templateUrl: './order-detail.html',
  styleUrls: ['./order-detail.css'],
})
export class OrderDetailComponent implements OnInit {
  order: Order | null = null;
  displayedColumns: string[] = ['productName', 'price', 'quantity', 'total'];

  constructor(
    private orderStore: OrderStore,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.router.navigate(['/order-list']);
      return;
    }

    const id = idParam;

    // handle direct URL/refresh where orders haven't loaded yet
    if (this.orderStore.orders().length === 0) {
      this.orderStore.loadOrders();
    }

    this.order = this.orderStore.getOrderById(id) ?? null;

    if (!this.order) {
      this.router.navigate(['/order-list']);
    }
  }

  goBack() {
    this.router.navigate(['/order-list']);
  }

  getStatusColor(status: string): string {
    console.log(status);
    switch (status) {
      case 'completed':
        return 'primary';
      case 'cancelled':
        return 'warn';
      default:
        return 'accent';
    }
  }
}
