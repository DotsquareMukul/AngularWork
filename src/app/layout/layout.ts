import { Component, effect, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { OrderStore } from '../store/order.store';
import { CustomerStore } from '../store/customer.store';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css'],
})
export class Layout implements OnInit {
  title = signal('OrderManagement');

  constructor(
    private orderState: OrderStore,
    private customerState: CustomerStore,
  ) {
    effect(() => {
      this.customerState.loadCustomers();
      this.orderState.loadOrders();
    });
  }

  ngOnInit(): void {
    // ensure data is loaded so the counts aren't stuck at 0
    this.customerState.loadCustomers();
    this.orderState.loadOrders();
  }

  get customersCount() {
    return this.customerState.totalCustomers();
  }

  get ordersCount() {
    return this.orderState.totalOrders();
  }

  get revenue() {
    return this.orderState.totalRevenue();
  }
}
