import { Component, ElementRef, inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ControlledScrollWithLoader } from '@core/classes/abstracts/controlled-scroll-with-loader.class';
import { LoaderSupporter } from '@core/classes/abstracts/loader-supporter.class';
import { LoaderActionEnum } from '@core/enums/loader/loader.enum';
import { ICard } from '@core/models/entities/cards.model';
import { Loader } from '@core/services/loader/loader.service';

@Component({
  selector: 'app-cards-with-scroll',
  templateUrl: './cards-with-scroll.component.html',
  styleUrl: './cards-with-scroll.component.css'
})
export class CardsWithScrollComponent extends ControlledScrollWithLoader implements OnInit, OnChanges {
  public loader = inject(Loader);
  @Input() cards: ICard[] = [];
  
  override loaderActionEnum: LoaderActionEnum = LoaderActionEnum.CARDS;

  // element with overflow hidden
  @ViewChild('cardsContentScroller') cardsContentScroller!: ElementRef<HTMLElement>;
  @ViewChild('sectionHeaderLimitedContainer') sectionHeaderLimitedContainer!: ElementRef<HTMLElement>

  ngOnInit(): void {
    
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  override bootstrap(){
    this.scrollerElementRef = this.cardsContentScroller;
    this.limitedContainerElementRef = this.sectionHeaderLimitedContainer;
  }
}
