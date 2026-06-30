import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, PRODUCTS, TAX_RATE } from '../../utils/MockData';
import { OrderService } from '../service/order';
import { Customer, CustomerService } from '../service/cutomer';

@Component({
  selector: 'app-order-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order-form.html',
  styleUrls: ['./order-form.css'],
})
export class OrderFormComponent implements OnInit {
  orderForm!: FormGroup;
  products: Product[] = PRODUCTS;
  taxRate = TAX_RATE;
  customers: Customer[] = [];

  statusOptions = ['Pending', 'Processing', 'Completed', 'Cancelled'];
  isEditMode = false;
  orderId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService,
  ) {}

  ngOnInit() {
    this.customerService.getCustomers().subscribe((data) => {
      this.customers = data;
    });
    this.orderForm = this.fb.group({
      customerName: ['', Validators.required],
      status: ['Pending', Validators.required],
      items: this.fb.array([this.createItem()]),
    });
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.orderId = +idParam;
      this.loadOrderForEdit(this.orderId);
    }
  }

  loadOrderForEdit(id: number) {
    const order = this.orderService.getOrderById(id);
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

    const lineItems = formValue.items.map((item: any) => {
      const product = this.products.find((p) => p.id === +item.productId);
      return {
        productId: +item.productId,
        productName: product ? product.name : '',
        price: product ? product.price : 0,
        quantity: item.quantity,
        total: (product ? product.price : 0) * item.quantity,
      };
    });

    const orderPayload = {
      customerName: formValue.customerName,
      status: formValue.status,
      items: lineItems,
      subtotal: this.subtotal,
      tax: this.taxAmount,
      grandTotal: this.grandTotal,
    };

    if (this.isEditMode && this.orderId !== null) {
      this.orderService.updateOrder(this.orderId, orderPayload);
    } else {
      this.orderService.addOrder(orderPayload);
    }

    this.router.navigate(['/order-list']);
  }

  goBack() {
    this.router.navigate(['/order-list']);
  }
}
