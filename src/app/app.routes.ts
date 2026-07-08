import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { CustomerListComponent } from './customer-list/customer-list';
import { CustomerFormComponent } from './customer-form/customer-form';
import { OrderListComponent } from './order-list/order-list';
import { OrderFormComponent } from './order-form/order-form';
import { OrderDetailComponent } from './order-detail/order-detail';
import { Login } from './auth/login/login';
import { authGuard } from './guard/auth-guard';
import { canDeactivateGuard } from './guard/can-deactivate-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: 'customer-form', component: CustomerFormComponent },
      { path: 'customer-list', component: CustomerListComponent },
      { path: '', redirectTo: 'customer-list', pathMatch: 'full' },
      { path: 'order-list', component: OrderListComponent },
      { path: 'order-form', component: OrderFormComponent, canDeactivate: [canDeactivateGuard] },
      { path: 'order-form/:id', component: OrderFormComponent },
      { path: 'order-detail/:id', component: OrderDetailComponent },
    ],
  },
  { path: '**', redirectTo: 'login' }, // ← catch unknown routes
];
