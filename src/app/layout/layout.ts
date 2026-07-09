import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { OrderStore } from '../store/order.store';
import { CustomerStore } from '../store/customer.store';
import { AuthService } from '../service/auth';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatNavList, MatListItem, MatListItemIcon, MatListItemTitle } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-layout',
  standalone: true,

  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatNavList,
    MatListItem,
    MatListItemIcon,
    MatListItemTitle,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
  ],

  templateUrl: './layout.html',
  styleUrls: ['./layout.css'],
})
export class Layout implements OnInit {
  title = signal('OrderManagement');

  constructor(
    private orderState: OrderStore,
    private customerState: CustomerStore,
    private authService: AuthService,
    private router: Router,
  ) {
    effect(() => {
      this.customerState.loadCustomers();
      this.orderState.loadOrders();
    });
  }

  @ViewChild('sidenav') sidenav!: MatSidenav;

  isMobile = signal(false);

  private breakpointObserver = inject(BreakpointObserver);

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isMobile.set(result.matches);
      if (result.matches) {
        this.sidenav.close();
      } else {
        this.sidenav.open();
      }
    });
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

  logOut() {
    console.log('hi');
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
