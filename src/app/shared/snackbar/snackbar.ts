import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export type SnackbarType = 'success' | 'error' | 'warning' | 'info';

export interface SnackbarData {
  message: string;
  type: SnackbarType;
}

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './snackbar.html',
  styleUrls: ['./snackbar.css'],
})
export class SnackbarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData,
    private snackBarRef: MatSnackBarRef<SnackbarComponent>,
  ) {}

  get icon(): string {
    switch (this.data.type) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
    }
  }

  close() {
    this.snackBarRef.dismiss();
  }
}
