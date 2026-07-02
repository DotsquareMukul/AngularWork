import { Component, effect, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AppStore } from '../app.store';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css'],
})
export class Layout implements OnInit {
  title = signal('OrderManagement');

  constructor(private store: AppStore) {
    effect(() => {
      this.store.loadCustomers();
      this.store.loadOrders();
    });
  }

  ngOnInit(): void {
    // ensure data is loaded so the counts aren't stuck at 0
    this.store.loadCustomers();
    this.store.loadOrders();
  }

  get customersCount() {
    return this.store.totalCustomers();
  }

  get ordersCount() {
    return this.store.totalOrders();
  }

  get revenue() {
    return this.store.totalRevenue();
  }
}
