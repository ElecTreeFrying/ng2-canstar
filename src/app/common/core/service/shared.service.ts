import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  loadingChanged = new Subject();

  constructor(
    private snack: MatSnackBar
  ) { }

  set setLoading(option: boolean) {
    this.loadingChanged.next(option)
  }

  openSnack(option: string, message?: string) {
    switch (option) {
      case 'startup':   this.emptyFields();     break;
      case 'message':   this.message(message);  break;
      default:                                  break;
    }
  }

  private emptyFields() {
    const config = new MatSnackBarConfig();
    config.duration = 7000;
    this.snack.open('Empty fields.', 'X', config)
  }

  private message(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    this.snack.open(message, 'X', config)
  }

}
