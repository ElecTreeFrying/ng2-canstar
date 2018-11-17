import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatDividerModule,
  MatRippleModule,
  MatProgressSpinnerModule,
  MatDialogModule,
} from '@angular/material';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  exports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    NgbRatingModule,
    MatDialogModule,
  ]
})
export class MatFeedModule { }
