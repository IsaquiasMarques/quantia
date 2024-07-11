import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetTheInitialsPipe } from './pipes/string/get-the-initials.pipe';
import { BackgroundUrlablePipe } from './pipes/css-supporter/background-urlable.pipe';
import { CardsWithScrollComponent } from './components/containers/cards-with-scroll/cards-with-scroll.component';
import { LoadSpinnerComponent } from '../singleton-components/load-spinner/load-spinner.component';
import { FormatPipe } from './pipes/number/format.pipe';



@NgModule({
  declarations: [
    GetTheInitialsPipe,
    BackgroundUrlablePipe,
    CardsWithScrollComponent,
    FormatPipe,
  ],
  imports: [
    CommonModule,
    LoadSpinnerComponent
  ],
  exports: [
    CommonModule,
    GetTheInitialsPipe,
    BackgroundUrlablePipe,
    CardsWithScrollComponent
  ]
})
export class SharedModule { }
