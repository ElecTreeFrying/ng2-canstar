import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbdRatingDecimal } from './rating-decimal';

import { FeedRoutingModule } from './feed-routing.module';
import { MatFeedModule } from '../../../common/core/module/mat-feed.module';

import { FeedComponent } from './feed.component';
import { CarModalComponent } from '../../../common/shared/component/car-modal/car-modal.component';
import { UcFirstPipe } from '../../../common/shared/pipe/ucfirst';

@NgModule({
  declarations: [
    FeedComponent,
    NgbdRatingDecimal,
    UcFirstPipe,
    CarModalComponent,
  ],
  entryComponents: [
    CarModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FeedRoutingModule,
    MatFeedModule
  ]
})
export class FeedModule { }
