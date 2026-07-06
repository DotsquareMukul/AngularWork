import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderStore } from '../store/order.store';
import { CustomerStore } from '../store/customer.store';
import { ProductStore } from '../store/product.store';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order-form.html',
  styleUrls: ['./order-form.css'],
})
export class OrderFormComponent implements OnInit {
  orderForm!: FormGroup;
  taxRate: number;

  statusOptions = ['pending', 'processing', 'completed', 'cancelled'];
  isEditMode = false;
  orderId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private orderStore: OrderStore,
    private customerStore: CustomerStore,
    private productStore: ProductStore,
  ) {
    this.taxRate = this.orderStore.taxRate;
  }

  // reads live from the store's signals — no local copies to go stale
  get customers() {
    return this.customerStore.customers();
  }

  get products() {
    return this.productStore.products();
  }

  get isLoading(): boolean {
    return this.customerStore.loadingCustomers();
  }

  ngOnInit() {
    this.productStore.loadProducts();

    this.orderForm = this.fb.group({
      customerId: ['', Validators.required],
      status: ['Pending', Validators.required],
      items: this.fb.array([this.createItem()]),
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.orderId = idParam;
      console.log(idParam);
      this.loadOrderForEdit(this.orderId);
    }
  }

  loadOrderForEdit(id: string) {
    console.log(id, 'form');
    const order = this.orderStore.getOrderById(id);
    console.log(order, 'edit order');
    console.log(order);
    if (!order) {
      this.router.navigate(['/order-list']);
      return;
    }

    this.items.clear();
    order.items.forEach((item) => {
      this.items.push(
        this.fb.group({
          productId: [item.productId, Validators.required],
          quantity: [item.quantity, [Validators.required, Validators.min(1)]],
        }),
      );
    });

    this.orderForm.patchValue({
      customerName: order.customerName,
      status: order.status,
      customerId: order.customerId,
    });
  }

  get f() {
    return this.orderForm.controls;
  }

  get items(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      productId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });
  }

  addItem() {
    this.items.push(this.createItem());
  }

  removeItem(index: number) {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }

  getProductPrice(productId: number): number {
    const product = this.products.find((p) => p.id === +productId);
    return product ? product.price : 0;
  }

  getLineTotal(index: number): number {
    const item = this.items.at(index).value;
    const price = this.getProductPrice(item.productId);
    return price * (item.quantity || 0);
  }

  get subtotal(): number {
    return this.items.controls.reduce((sum, _, i) => sum + this.getLineTotal(i), 0);
  }

  get taxAmount(): number {
    return this.subtotal * this.taxRate;
  }

  get grandTotal(): number {
    return this.subtotal + this.taxAmount;
  }

  onSubmit() {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }

    const formValue = this.orderForm.value;
    const selectedCustomer = this.customers.find((c) => c.id === formValue.customerId);
    const lineItems = formValue.items.map((item: any) => {
      const product = this.products.find((p) => p.id === +item.productId);
      return {
        productId: +item.productId,
        productName: product ? product.name : '',
        unitPrice: product ? product.price : 0,
        quantity: item.quantity,
        total: (product ? product.price : 0) * item.quantity,
      };
    });

    const orderPayload = {
      customerId: formValue.customerId,
      customerName: selectedCustomer
        ? `${selectedCustomer.firstName} ${selectedCustomer.lastName}`
        : '',
      status: formValue.status,
      items: lineItems,
      subtotal: this.subtotal,
      tax: this.taxAmount,
      total: this.grandTotal,
    };

    if (this.isEditMode && this.orderId !== null) {
      this.orderStore.updateOrder(this.orderId, orderPayload);
    } else {
      this.orderStore.addOrder(orderPayload);
    }

    this.router.navigate(['/order-list']);
  }

  goBack() {
    this.router.navigate(['/order-list']);
  }
}
