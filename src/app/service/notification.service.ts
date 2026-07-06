import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent, SnackbarType } from '../shared/snackbar/snackbar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private snackBar = inject(MatSnackBar);

  private show(message: string, type: SnackbarType, duration = 1000) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message, type },
      duration,
      panelClass: [`snackbar-panel-${type}`],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  success(message: string, duration?: number) {
    this.show(message, 'success', duration);
  }

  error(message: string, duration?: number) {
    this.show(message, 'error', duration ?? 4000);
  }

  warning(message: string, duration?: number) {
    this.show(message, 'warning', duration);
  }

  info(message: string, duration?: number) {
    this.show(message, 'info', duration);
  }
}
