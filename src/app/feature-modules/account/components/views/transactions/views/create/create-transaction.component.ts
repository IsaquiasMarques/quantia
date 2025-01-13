import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoaderActionEnum } from '@core/enums/loader/loader.enum';
import { SUPABASE_RESPONSE_STATUS } from '@core/enums/supabase-response-status.enum';
import { ICard } from '@core/models/entities/cards.model';
import { IGoal } from '@core/models/entities/goals.model';
import { UserService } from '@core/services/entities/user/user.service';
import { Loader } from '@core/services/loader/loader.service';
import { PopupLogService, LogStatus } from '@core/services/loggers/pop-up-log.service';
import { CardFacade } from '@feature-modules/account/facades/card.facade';
import { GoalFacade } from '@feature-modules/account/facades/goal.facade';
import { TransactionFacade } from '@feature-modules/account/facades/transaction.facade';
import { EntitiesIntermediator } from '@feature-modules/account/services/entities-intermediator.service';
import { NumberFormatation } from '@shared/helpers/number-format.func';
import { from, take } from 'rxjs';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrl: './create-transaction.component.css'
})
export class CreateTransactionComponent {

  public loaderService = inject(Loader);
  private cardFacade = inject(CardFacade);
  private goalFacade = inject(GoalFacade);
  private transactionFacade = inject(TransactionFacade);
  public entitiesIntermediator = inject(EntitiesIntermediator);
  private log = inject(PopupLogService);
  public userService = inject(UserService);

  createTransactionFormGroup!: FormGroup;

  createTransactionloaderActionEnum = LoaderActionEnum.CREATE_TRANSACTION;
  getTypesLoaderActionEnum = LoaderActionEnum.TRANSACTION_TYPES;
  getCardsLoaderActionEnum = LoaderActionEnum.CARDS;
  getOriginGoalsLoaderActionEnum = LoaderActionEnum.GOALS;
  getDestinationGoalsLoaderActionEnum = LoaderActionEnum.GOALS;

  selectedCardGoalsLength: number = 0;

  types: TransactionType[] = [
    {
      name: 'Receita',
      key: 'income'
    },
    {
      name: 'Meta para meta',
      key: 'g2g'
    },
    {
      name: 'Gasto',
      key: 'expense'
    }
  ];
  selectedType: TransactionType[] = [{ name: 'Receita', key: 'income' }];

  cards: ICard[] = [];
  originGoals: IGoal[] = [];
  destinationGoals: IGoal[] = [];

  selectedOriginCard: ICard[] = [];
  selectedDestinationCard: ICard[] = [];

  selectedOriginGoal: IGoal[] = [];
  selectedDestinationGoal: IGoal[] = [];

  resetCardSelection: boolean = false;
  resetIconsSelection: boolean = false;
  resetTransactionTypeSelection: boolean = false;

  today = new Date().toISOString().split('T')[0];

  ngOnInit(): void {
    
    this.getCards();

    this.createTransactionFormGroup = new FormGroup({
      'description': new FormControl('', [ Validators.required, Validators.maxLength(30) ]),
      'amount': new FormControl('', [ Validators.required, Validators.minLength(0) ]),
      'transaction_date': new FormControl(this.today, [ Validators.required, Validators.minLength(0) ]),
      'notes': new FormControl('', [ Validators.maxLength(100) ])
    });
  }

  private getCards(): void{
    this.loaderService.changeState(this.getCardsLoaderActionEnum, true);
    this.cardFacade.getCards.subscribe({
      next: cards => {
        this.cards = cards;
        if(this.cards.length > 0){
          this.loaderService.changeState(this.getCardsLoaderActionEnum, false);
        } else {
          this.loaderService.changeStateAfterFirstResponseIsEmpty(this.getCardsLoaderActionEnum, false);
        }
      },
      error: error => {
        console.error(error);
        this.log.add(error, LogStatus.ERROR);
        this.loaderService.changeState(this.getCardsLoaderActionEnum, false);
      }
    });
  }

  private getOriginGoalsByCard(card_id: string): void{
    this.loaderService.changeState(this.getOriginGoalsLoaderActionEnum, true);
    this.goalFacade.getGoalsByCardIdFromService(card_id).pipe(take(1)).subscribe({
      next: goals => {
        this.originGoals = goals;
        if(this.originGoals.length > 0){
          this.loaderService.changeState(this.getOriginGoalsLoaderActionEnum, false);
        } else {
          this.loaderService.changeStateAfterFirstResponseIsEmpty(this.getOriginGoalsLoaderActionEnum, false);
        }
      },
      error: error => {
        console.error(error);
        this.log.add(error, LogStatus.ERROR);
        this.loaderService.changeState(this.getOriginGoalsLoaderActionEnum, false);
      }
    });
  }

  private getDestinationGoalsByCard(card_id: string): void{
    this.loaderService.changeState(this.getDestinationGoalsLoaderActionEnum, true);
    this.goalFacade.getGoalsByCardIdFromService(card_id).pipe(take(1)).subscribe({
      next: goals => {
        this.destinationGoals = goals;
        if(this.destinationGoals.length > 0){
          this.loaderService.changeState(this.getDestinationGoalsLoaderActionEnum, false);
        } else {
          this.loaderService.changeStateAfterFirstResponseIsEmpty(this.getDestinationGoalsLoaderActionEnum, false);
        }
      },
      error: error => {
        console.error(error);
        this.log.add(error, LogStatus.ERROR);
        this.loaderService.changeState(this.getDestinationGoalsLoaderActionEnum, false);
      }
    });
  }

  captureSelectedOriginCard($event: ICard[]): void{
    this.selectedOriginCard = $event;
    this.getOriginGoalsByCard(this.selectedOriginCard[0].id);
  }

  captureSelectedDestinationCard($event: ICard[]): void{
    this.selectedDestinationCard = $event;
    this.getDestinationGoalsByCard(this.selectedDestinationCard[0].id);
  }

  captureSelectedOriginGoal($event: any[]): void{
    this.selectedOriginGoal = $event;
  }

  captureSelectedDestinationGoal($event: any[]): void{
    this.selectedDestinationGoal = $event;
  }

  captureSelectedTransactionType($event: any[]): void{
    this.selectedType = $event;
  }

  submit(): void{
    if(
      this.createTransactionFormGroup.invalid ||
      !(this.selectedType.length > 0)
    ) return;

    const transaction = {
      description: this.createTransactionFormGroup.get('description')?.value,
      amount: NumberFormatation.unformatNumber(this.createTransactionFormGroup.get('amount')?.value),
      transaction_date: this.createTransactionFormGroup.get('transaction_date')?.value,
      notes: this.createTransactionFormGroup.get('notes')?.value,
      type: this.selectedType[0].key,
      from: (this.selectedType[0].key == 'expense' || this.selectedType[0].key === 'g2g') ? 'inside' : 'outside',
      origin_goal_id: (this.selectedOriginGoal.length > 0) ? this.selectedOriginGoal[0].id : null,
      destination_goal_id: (this.selectedDestinationGoal.length > 0) ? this.selectedDestinationGoal[0].id : null
    }

    var targetGoals: IGoal[] = []; // origin and destination
    var targetCards: ICard[] = []; // origin and destination

    if(this.selectedOriginCard[0] && this.selectedOriginGoal[0]){
      targetCards = [...targetCards, this.selectedOriginCard[0]];
      targetGoals = [...targetGoals, this.selectedOriginGoal[0]];
    }
    
    if(this.selectedDestinationCard[0] && this.selectedDestinationGoal[0]){
      targetCards = [...targetCards, this.selectedDestinationCard[0]];
      targetGoals = [...targetGoals, this.selectedDestinationGoal[0]];
    }

    this.loaderService.changeState(this.createTransactionloaderActionEnum, true);
    this.transactionFacade.create(transaction, targetGoals, targetCards).pipe(take(1)).subscribe({
      next: response => {
        if(response.error){
          this.log.add("Erro ao registrar esta transação: " + response.error, LogStatus.ERROR);
        }

        if(response.status == SUPABASE_RESPONSE_STATUS.SUCCESS_WITH_DATA){
          this.log.add("Transação registrada com êxito", LogStatus.SUCCESS);
          // reseting form
          this.createTransactionFormGroup.reset();
        }
        this.loaderService.changeState(this.createTransactionloaderActionEnum, false);
      },
      error: error => {
        console.error(error);
        this.log.add(error, LogStatus.ERROR);
      }
    })

  }
}
interface TransactionType{
  name: string,
  key: 'income' | 'g2g' | 'expense'
}