import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { CustomerListComponent } from './customer-list/customer-list';
import { CustomerFormComponent } from './customer-form/customer-form';
import { OrderListComponent } from './order-list/order-list';
import { OrderFormComponent } from './order-form/order-form';
import { OrderDetailComponent } from './order-detail/order-detail';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: 'customer-form', component: CustomerFormComponent },
      { path: 'customer-list', component: CustomerListComponent },
      { path: '', redirectTo: 'customer-list', pathMatch: 'full' },
      { path: 'order-list', component: OrderListComponent },
      { path: 'order-form', component: OrderFormComponent },
      { path: 'order-form/:id', component: OrderFormComponent },
      { path: 'order-detail/:id', component: OrderDetailComponent },
    ],
  },
];
