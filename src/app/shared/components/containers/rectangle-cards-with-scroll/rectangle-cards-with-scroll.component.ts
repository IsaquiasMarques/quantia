import { Component, ElementRef, inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ControlledScrollWithLoader } from '@core/classes/abstracts/controlled-scroll-with-loader.class';
import { LoaderActionEnum } from '@core/enums/loader/loader.enum';
import { ICard } from '@core/models/entities/cards.model';
import { ICurrency } from '@core/models/entities/currencies.model';
import { IGoal } from '@core/models/entities/goals.model';
import { Loader } from '@core/services/loader/loader.service';
import { SeeMoneyService } from '@shared/services/see-money.service';

@Component({
  selector: 'app-rectangle-cards-with-scroll',
  templateUrl: './rectangle-cards-with-scroll.component.html',
  styleUrl: './rectangle-cards-with-scroll.component.css'
})
export class RectangleCardsWithScrollComponent
extends ControlledScrollWithLoader
implements OnInit, OnChanges {

  public seeMoneyService = inject(SeeMoneyService);
  
  @Input() sectionTitle: { title: string, count: boolean, limit: number } = { title: 'Cards', count: false, limit: 0 };
  @Input() showLimitationsInformation!: { status: boolean, limit: number };
  @Input() goals: IGoal[] = [];
  @Input() card!: ICard;
  @Input() addCardButton: { visibility: boolean, route?: string } = { visibility: false };
  @Input() cardDropdownButton: { visible: boolean, items: ('edit' | 'hideValues' | 'delete')[] } = { visible: true, items: [ "edit", "hideValues" ] }
  
  // element with overflow hidden
  @ViewChild('goalsContentScroller') goalsContentScroller!: ElementRef<HTMLElement>;
  @ViewChild('sectionHeaderLimitedContainer') sectionHeaderLimitedContainer!: ElementRef<HTMLElement>

  override bootstrap(){
    this.scrollerElementRef = this.goalsContentScroller;
    this.limitedContainerElementRef = this.sectionHeaderLimitedContainer;
  }
  
  ngOnInit(): void {
    if(this.captureEvents){
      this.activeIndexEventEmitter.emit(this.activeIndex);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.itemsArray = this.goals;
    this.activeIndex = 0;
    if(this.captureEvents){
      this.activeIndexEventEmitter.emit(this.activeIndex);
    }
  }
  
}
