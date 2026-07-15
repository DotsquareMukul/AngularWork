import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-observerable',
  imports: [ReactiveFormsModule],
  templateUrl: './observerable.html',
  styleUrl: './observerable.css',
})
export class Observerable {
  http = inject(HttpClient);
  searchControl: FormControl = new FormControl();
  constructor() {
    this.searchControl.valueChanges.subscribe((value) => {
      debugger;
      console.log(value);
    });
    const users$ = this.http.get('https://jsonplaceholder.typicode.com/users');
    const post$ = this.http.get('https://jsonplaceholder.typicode.com/posts');
    forkJoin([users$, post$]).subscribe((res) => {
      console.log(res);
    });
  }
}
