import { Component, ElementRef, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ControlledScrollWithLoader } from '@core/classes/abstracts/controlled-scroll-with-loader.class';
import { LoaderActionEnum } from '@core/enums/loader/loader.enum';
import { ICard } from '@core/models/entities/cards.model';
import { Loader } from '@core/services/loader/loader.service';

@Component({
  selector: 'app-square-cards-with-scroll',
  templateUrl: './square-cards-with-scroll.component.html',
  styleUrl: './square-cards-with-scroll.component.css'
})
export class SquareCardsWithScrollComponent
extends ControlledScrollWithLoader
implements OnInit, OnChanges {

  public loader = inject(Loader);
  @Input() sectionTitle: string = '';
  @Input() cards: ICard[] = [];
  
  override loaderActionEnum: LoaderActionEnum = LoaderActionEnum.CARDS;

  // element with overflow hidden
  @ViewChild('cardsContentScroller') cardsContentScroller!: ElementRef<HTMLElement>;
  @ViewChild('sectionHeaderLimitedContainer') sectionHeaderLimitedContainer!: ElementRef<HTMLElement>

  ngOnInit(): void {
    
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.itemsArray = this.cards;
  }

  override bootstrap(){
    this.scrollerElementRef = this.cardsContentScroller;
    this.limitedContainerElementRef = this.sectionHeaderLimitedContainer;
  }
}
