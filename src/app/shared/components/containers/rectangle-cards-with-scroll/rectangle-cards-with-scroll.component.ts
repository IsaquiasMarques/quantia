import { Component, ElementRef, inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ControlledScrollWithLoader } from '@core/classes/abstracts/controlled-scroll-with-loader.class';
import { LoaderActionEnum } from '@core/enums/loader/loader.enum';
import { ICard } from '@core/models/entities/cards.model';
import { ICurrency } from '@core/models/entities/currencies.model';
import { IGoal } from '@core/models/entities/goals.model';
import { Loader } from '@core/services/loader/loader.service';

@Component({
  selector: 'app-rectangle-cards-with-scroll',
  templateUrl: './rectangle-cards-with-scroll.component.html',
  styleUrl: './rectangle-cards-with-scroll.component.css'
})
export class RectangleCardsWithScrollComponent
extends ControlledScrollWithLoader
implements OnInit, OnChanges {
  public loader = inject(Loader);
  @Input() sectionTitle: string = '';
  @Input() goals: IGoal[] = [];
  @Input() cardCurrency!: ICurrency;
  
  override loaderActionEnum: LoaderActionEnum = LoaderActionEnum.CARDS;

  // element with overflow hidden
  @ViewChild('goalsContentScroller') goalsContentScroller!: ElementRef<HTMLElement>;
  @ViewChild('sectionHeaderLimitedContainer') sectionHeaderLimitedContainer!: ElementRef<HTMLElement>

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.itemsArray = this.goals;
  }
  
  override bootstrap(){
    this.scrollerElementRef = this.goalsContentScroller;
    this.limitedContainerElementRef = this.sectionHeaderLimitedContainer;
  }
}
