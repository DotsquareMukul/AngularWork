import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmDialogData {
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}
@Component({
  selector: 'app-confirm-dialuge',
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './confirm-dialuge.html',
  styleUrl: './confirm-dialuge.css',
})
export class ConfirmDialogComponent {
  private dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  data: ConfirmDialogData = inject(MAT_DIALOG_DATA) ?? {};

  stay(): void {
    console.log('stay clicked');
    this.dialogRef.close(false);
  }
  leave(): void {
    console.log('leave clicked');
    this.dialogRef.close(true);
  }
}
