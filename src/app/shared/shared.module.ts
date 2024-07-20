import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetTheInitialsPipe } from './pipes/string/get-the-initials.pipe';
import { BackgroundUrlablePipe } from './pipes/css-supporter/background-urlable.pipe';
import { SquareCardsWithScrollComponent } from './components/containers/square-cards-with-scroll/square-cards-with-scroll.component';
import { LoadSpinnerComponent } from '../components/load-spinner/load-spinner.component';
import { FormatPipe } from './pipes/number/format.pipe';
import { IconComponent } from './components/singleton/icon/icon.component';
import { RectangleCardsWithScrollComponent } from './components/containers/rectangle-cards-with-scroll/rectangle-cards-with-scroll.component';
import { SquareCardComponent } from './components/singleton/cards/square/square-card.component';
import { RectangleCardComponent } from './components/singleton/cards/rectangle/rectangle-card/rectangle-card.component';

@NgModule({
  declarations: [
    GetTheInitialsPipe,
    BackgroundUrlablePipe,
    SquareCardsWithScrollComponent,
    RectangleCardsWithScrollComponent,
    // CardComponent,
  ],
  imports: [
    CommonModule,
    LoadSpinnerComponent,
    IconComponent,
    FormatPipe,
    SquareCardComponent,
    RectangleCardComponent,
  ],
  exports: [
    CommonModule,
    GetTheInitialsPipe,
    BackgroundUrlablePipe,
    SquareCardsWithScrollComponent,
    RectangleCardsWithScrollComponent,
    IconComponent,
    FormatPipe,
  ]
})
export class SharedModule { }
