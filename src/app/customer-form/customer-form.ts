import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CustomerStore } from '../store/customer.store';

@Component({
  selector: 'app-customer-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './customer-form.html',
  styleUrls: ['./customer-form.css'],
})
export class CustomerFormComponent implements OnInit {
  customerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cutsomerStore: CustomerStore,
  ) {}

  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', Validators.minLength],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[0-9]{10}$/)]],
      address: [''],
      city: ['', Validators.required],
      zip: ['', Validators.pattern(/^[0-9]{6}$/)],
    });
  }

  get f() {
    return this.customerForm.controls;
  }

  goBack() {
    this.router.navigate(['/customer-list']);
  }

  onSubmit() {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }
    this.cutsomerStore.addCustomer(this.customerForm.value);

    this.router.navigate(['/customer-list']);
  }
}
