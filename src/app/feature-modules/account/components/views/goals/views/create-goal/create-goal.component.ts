import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaderActionEnum } from '@core/enums/loader/loader.enum';
import { ICard } from '@core/models/entities/cards.model';
import { Loader } from '@core/services/loader/loader.service';
import { CardFacade } from '@feature-modules/account/facades/card.facade';

@Component({
  selector: 'app-create-goal',
  templateUrl: './create-goal.component.html',
  styleUrl: './create-goal.component.css'
})
export class CreateGoalComponent implements OnInit {

  public loaderService = inject(Loader);
  private cardFacade = inject(CardFacade);

  createGoalFormGroup!: FormGroup;

  createGoalloaderActionEnum = LoaderActionEnum.CREATE_GOAL;

  cards: ICard[] = [];
  selectedCard: ICard[] = [];

  icons: any[] = [];
  selectedIcon: any[] = [];

  resetCardSelection: boolean = false;
  resetIconsSelection: boolean = false;

  ngOnInit(): void {
    
    this.getCards();

    this.createGoalFormGroup = new FormGroup({
      'name': new FormControl('', [ Validators.required, Validators.maxLength(30) ]),
      'description': new FormControl('', [ Validators.required, Validators.maxLength(30) ]),
      'achievement': new FormControl('', [ Validators.required ])
    });
  }

  private getCards(): void{
    this.cardFacade.getCards.subscribe({
      next: cards => {
        this.cards = cards;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  captureSelectedCard($event: ICard[]): void{
    this.selectedCard = $event;
  }

  captureSelectedIcon($event: any[]): void{
    this.selectedIcon = $event;
  }

  submit(): void{}

}
