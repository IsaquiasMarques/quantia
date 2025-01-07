import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Unsubscriber } from '@core/classes/unsubscriber.class';
import { LoaderActionEnum } from '@core/enums/loader/loader.enum';
import { ICardObjective } from '@core/models/entities/card-objective.model';
import { ICard } from '@core/models/entities/cards.model';
import { ICurrency } from '@core/models/entities/currencies.model';
import { UserService } from '@core/services/entities/user/user.service';
import { Loader } from '@core/services/loader/loader.service';
import { LogStatus, PopupLogService } from '@core/services/loggers/pop-up-log.service';
import { CardFacade } from '@feature-modules/account/facades/card.facade';
import { CurrencyFacade } from '@feature-modules/account/facades/currency.facade';
import { ObjectiveFacade } from '@feature-modules/account/facades/objective.facade';
import { take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrl: './edit-card.component.css'
})
export class EditCardComponent extends Unsubscriber implements OnInit {

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  private cardFacade = inject(CardFacade);
  private objectiveFacade = inject(ObjectiveFacade);
  private currencyFacade = inject(CurrencyFacade);
  public userService = inject(UserService);

  public loaderService = inject(Loader);
  private loggerService = inject(PopupLogService);

  editCardFormGroup!: FormGroup;

  resetObjectivesSelection: boolean = false;
  resetCurrenciesSelection: boolean = false;

  editCardloaderActionEnum: LoaderActionEnum = LoaderActionEnum.EDIT_CARD;
  getObjectivesloaderActionEnum = LoaderActionEnum.CARD_OBJECTIVES;
  getCurrenciesLoaderActionEnum = LoaderActionEnum.CURRENCIES;

  objectives: ICardObjective[] = [];
  currencies: ICurrency[] = [];

  selectedObjective: ICardObjective[] = [];
  selectedCurrency: ICurrency[] = [];

  theCard: WritableSignal<ICard[]> = signal([]);

  ngOnInit(): void {

    this.activatedRoute.paramMap.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
      const id = params.get('id');
      if(!id){
        // 
        return;
      }
      this.getTheCardById(id);

      this.editCardFormGroup = new FormGroup({
        'name': new FormControl(this.theCard()[0].name, [ Validators.required, Validators.max(50), Validators.min(1) ]),
        'color': new FormControl(this.theCard()[0].settings.highlightColor, [ Validators.required ]),
      });

    })

    this.getObjectives();
    this.getCurrencies();
  }

  getTheCardById(id: string): void{
    this.cardFacade.getCardById(id).pipe(take(1)).subscribe(cards => {
      this.theCard.set(cards);
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
      this.editCardFormGroup.invalid ||
      !(this.selectedObjective.length > 0) ||
      !(this.selectedCurrency.length > 0) ||
      !(this.theCard().length > 0)
    ) return;

    const card = {
      name: this.editCardFormGroup.get('name')?.value,
      objective_id: this.selectedObjective[0].id,
      currency_id: this.selectedCurrency[0].id,
      highlightColor: this.editCardFormGroup.get('color')?.value,
    }

    this.loaderService.changeState(this.editCardloaderActionEnum, true);
    this.cardFacade.updateCard(this.theCard()[0].id, card).subscribe({
      next: response => {
        if(response.error){
          this.loggerService.add(response.error.message, LogStatus.ERROR);
          console.error(response.error.message)
          return;
        }

        if(response.status === 204){
          this.loggerService.add("Cartão editado", LogStatus.SUCCESS);
          this.editCardFormGroup.reset();
          this.resetObjectivesSelection = true;
          this.resetCurrenciesSelection = true;

          this.router.navigate(['/account']);
          
        }
        this.loaderService.changeState(this.editCardloaderActionEnum, false);
      },
      error: error => {
        this.loggerService.add(error, LogStatus.ERROR);
        console.error(error)
        this.loaderService.changeState(this.editCardloaderActionEnum, false)
      }
    })

  }

}
