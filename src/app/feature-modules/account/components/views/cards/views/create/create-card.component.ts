import { Component, inject, OnInit } from '@angular/core';
import { LoaderActionEnum } from '@core/enums/loader/loader.enum';
import { ICard } from '@core/models/entities/cards.model';
import { CardFacade } from '@feature-modules/account/facades/card.facade';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrl: './create-card.component.css'
})
export class CreateCardComponent implements OnInit {

  private cardFacade = inject(CardFacade);

  cards: ICard[] = [];
  loaderActionEnum = LoaderActionEnum;

  ngOnInit(): void {
    
  }

}
