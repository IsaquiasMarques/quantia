import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Unsubscriber } from '@core/classes/unsubscriber.class';
import { LoaderActionEnum } from '@core/enums/loader/loader.enum';
import { SUPABASE_RESPONSE_STATUS } from '@core/enums/supabase-response-status.enum';
import { ICardObjective } from '@core/models/entities/card-objective.model';
import { ICard } from '@core/models/entities/cards.model';
import { ICurrency } from '@core/models/entities/currencies.model';
import { UserService } from '@core/services/entities/user/user.service';
import { Loader } from '@core/services/loader/loader.service';
import { LogStatus, PopupLogService } from '@core/services/loggers/pop-up-log.service';
import { CardFacade } from '@feature-modules/account/facades/card.facade';
import { CurrencyFacade } from '@feature-modules/account/facades/currency.facade';
import { ObjectiveFacade } from '@feature-modules/account/facades/objective.facade';
import { pipe, takeUntil } from 'rxjs';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrl: './create-card.component.css'
})
export class CreateCardComponent extends Unsubscriber implements OnInit {

  private cardFacade = inject(CardFacade);
  private objectiveFacade = inject(ObjectiveFacade);
  private currencyFacade = inject(CurrencyFacade);
  public userService = inject(UserService);

  public loaderService = inject(Loader);
  private loggerService = inject(PopupLogService);

  cards: ICard[] = [];

  resetObjectivesSelection: boolean = false;
  resetCurrenciesSelection: boolean = false;

  loaderActionEnum: LoaderActionEnum = LoaderActionEnum.CARDS;
  createCardloaderActionEnum: LoaderActionEnum = LoaderActionEnum.CREATE_CARD;
  
  getObjectivesloaderActionEnum = LoaderActionEnum.CARD_OBJECTIVES;
  getCurrenciesLoaderActionEnum = LoaderActionEnum.CURRENCIES;

  createCardFormGroup!: FormGroup;
  objectives: ICardObjective[] = [];
  currencies: ICurrency[] = [];

  selectedObjective: ICardObjective[] = [];
  selectedCurrency: ICurrency[] = [];
  
  ngOnInit(): void {
    this.createCardFormGroup = new FormGroup({
      'name': new FormControl('', [ Validators.required, Validators.max(50), Validators.min(1) ]),
      'color': new FormControl('', [ Validators.required ]),
    });

    this.getCards();
    this.getObjectives();
    this.getCurrencies();
  }

  private getCards(): void{
    this.loaderService.changeState(this.loaderActionEnum, true);
    this.cardFacade.getCards.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: incoming => {
        this.cards = incoming
        if(this.cards.length > 0){
          this.loaderService.changeState(this.loaderActionEnum, false);
        } else {
          this.loaderService.changeStateAfterFirstResponseIsEmpty(this.loaderActionEnum, false)
        }
      },
      error: error => {
        console.error(error)
      }
    });
  }

  captureSelectedObjective($event: any[]): void{
    this.selectedObjective = $event;
  }

  captureSelectedCurrency($event: any[]): void{
    this.selectedCurrency = $event;
  }

  private getObjectives(): void{
    this.loaderService.changeState(this.getObjectivesloaderActionEnum, true);
    this.objectiveFacade.getObjectives().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: incoming => {
        this.objectives = incoming;

        if(this.objectives.length > 0){
          this.loaderService.changeState(this.getObjectivesloaderActionEnum, false);
        } else {
          this.loaderService.changeStateAfterFirstResponseIsEmpty(this.getObjectivesloaderActionEnum, false)
        }
        
      },
      error: error => {
        console.error(error)
        this.loggerService.add(error, LogStatus.ERROR);
        this.loaderService.changeState(this.getObjectivesloaderActionEnum, false);
      }
    });
  }

  private getCurrencies(): void{
    this.loaderService.changeState(this.getCurrenciesLoaderActionEnum, true);
    this.currencyFacade.getCurrencies().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: incoming => {
        this.currencies = incoming;
        if(this.currencies.length > 0){
          this.loaderService.changeState(this.getCurrenciesLoaderActionEnum, false);
        } else {
          this.loaderService.changeStateAfterFirstResponseIsEmpty(this.getCurrenciesLoaderActionEnum, false);
        }
      },
      error: error => {
        console.error(error);
        this.loggerService.add(error, LogStatus.ERROR)
        this.loaderService.changeState(this.getCurrenciesLoaderActionEnum, false);
      }
    });
  }

  submit(): void{
    if(
      this.createCardFormGroup.invalid ||
      !(this.selectedObjective.length > 0) ||
      !(this.selectedCurrency.length > 0)
    ) return;

    const card = {
      name: this.createCardFormGroup.get('name')?.value,
      objective_id: this.selectedObjective[0].id,
      currency_id: this.selectedCurrency[0].id,
      highlightColor: this.createCardFormGroup.get('color')?.value,
    }

    this.loaderService.changeState(this.createCardloaderActionEnum, true);
    this.cardFacade.createCardWithSettings(card).subscribe({
      next: response => {
        if(response.status === SUPABASE_RESPONSE_STATUS.SUCCESS_WITH_DATA){
          this.loggerService.add("Cartão adicionado", LogStatus.SUCCESS);
          this.createCardFormGroup.reset();
          this.resetObjectivesSelection = true;
          this.resetCurrenciesSelection = true;
          
        }
        this.loaderService.changeState(this.createCardloaderActionEnum, false);
      },
      error: error => {
        this.loggerService.add(error, LogStatus.ERROR);
        console.error(error)
        this.loaderService.changeState(this.createCardloaderActionEnum, false)
      }
    })

  }

}
