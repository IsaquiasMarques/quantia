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
import { RouterModule } from '@angular/router';
import { ScrollerPointControllersComponent } from './components/singleton/scroller-point-controllers/scroller-point-controllers.component';
import { SelectComponent } from './components/widgets/select/select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GetTheInitialsPipe,
    SquareCardsWithScrollComponent,
    RectangleCardsWithScrollComponent,
    SelectComponent,
  ],
  imports: [
    CommonModule,
    LoadSpinnerComponent,
    IconComponent,
    FormatPipe,
    SquareCardComponent,
    RectangleCardComponent,
    ScrollerPointControllersComponent,
    RouterModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    GetTheInitialsPipe,
    SquareCardsWithScrollComponent,
    RectangleCardsWithScrollComponent,
    IconComponent,
    FormatPipe,
    RouterModule,
    SelectComponent,
    LoadSpinnerComponent
  ]
})
export class SharedModule { }
