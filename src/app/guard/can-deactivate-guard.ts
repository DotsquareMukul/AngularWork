import { CanDeactivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, take } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../shared/confirm-dialuge/confirm-dialuge';

export interface CanDeactivateI {
  isDirty: () => boolean;
  isSubmitted: () => boolean;
}

export const canDeactivateGuard: CanDeactivateFn<CanDeactivateI> = (component) => {
  if (component.isSubmitted() || !component.isDirty()) return true;

  const dialog = inject(MatDialog);

  const dialogRef = dialog.open(ConfirmDialogComponent, {
    width: '380px',
    disableClose: true,
    restoreFocus: false,
    data: {
      title: 'Unsaved Changes',
      message: 'Do you want to leave this page? Your changes will be lost.',
      confirmLabel: 'Leave',
      cancelLabel: 'Stay',
    },
  });

  return dialogRef.afterClosed().pipe(
    take(1),
    map((result: boolean) => result === true),
  );
};
