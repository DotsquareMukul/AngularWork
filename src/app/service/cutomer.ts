import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5001/api/customers';

  getAll(): Observable<Customer[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map((res) =>
        res.data.map((u: any) => ({
          id: u.id,
          firstName: u.name.split(' ')[0],
          lastName: u.name.split(' ')[1] || '',
          email: u.email,
          phone: u.phone,
          address: u.address || '',
          city: u.city || '',
          zip: u.address?.zipcode || '',
        })),
      ),
    );
  }

  create(customer: Omit<Customer, 'id'>): Observable<Customer> {
    const { firstName, lastName, ...rest } = customer;
    const payload = { ...rest, name: `${firstName} ${lastName}` };

    return this.http.post<any>(this.baseUrl, payload).pipe(
      map((created) => {
        const { name, ...rest } = created;
        return {
          ...rest,
          firstName: name.split(' ')[0],
          lastName: name.split(' ')[1] || '',
        };
      }),
    );
  }

  update(id: string, customer: Omit<Customer, 'id'>): Observable<Customer> {
    return this.http
      .put<any>(`${this.baseUrl}/${id}`, customer)
      .pipe(map(() => ({ ...customer, id })));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
