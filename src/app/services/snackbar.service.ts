import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) {}

  onSuccess(message: string) {
    this._snackBar.open(message, '', {
      duration: 4000,
      panelClass: ['success-snackbar']
    });
  }

  onError(message: string) {
    this._snackBar.open(message, '', {
      duration: 4000,
      panelClass: ['error-snackbar']
    });
  }

  onWarning(message: string) {
    this._snackBar.open(message, '', {
      duration: 4000,
      panelClass: ['warning-snackbar']
    });
  }
}
