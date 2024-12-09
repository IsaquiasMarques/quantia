import { Component, OnInit, inject, signal } from '@angular/core';
import { DashboardMicroTasks } from '@core/classes/pages/dashboard-micro-tasks.class';
import { Actions } from '@core/data/actions/actions.data';
import { Store } from '@core/data/store/store.data';
import { LoaderActionEnum } from '@core/enums/loader/loader.enum';
import { ICard } from '@core/models/entities/cards.model';
import { IGoal } from '@core/models/entities/goals.model';
import { ITransaction } from '@core/models/entities/transaction.model';
import { AuthService } from '@core/services/auth/auth.service';
import { CardFacade } from '@feature-modules/account/facades/card.facade';
import { GoalFacade } from '@feature-modules/account/facades/goal.facade';
import { TransactionFacade } from '@feature-modules/account/facades/transaction.facade';
import { map, take, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent
extends DashboardMicroTasks
implements OnInit {

  private cardFacade = inject(CardFacade);
  private goalFacade = inject(GoalFacade);
  private transactionFacade = inject(TransactionFacade);

  generalCards: ICard[] = [];
  cards: ICard[] = [];
  goals: IGoal[] = [];
  transactions: ITransaction[] = [];

  loaderActionEnum = LoaderActionEnum;

  activeCardIndex = signal(0);
  activeGoalIndex = signal(0);

  ngOnInit(): void {
    this.getCards();
  }

  getCards(): void{
    this.loader.changeState(LoaderActionEnum.CARDS, true)
    this.cardFacade.getCards.pipe(takeUntil(this.unsubscribe$ || this.cards.length > 0)).subscribe({
      next: (incoming) => {
        this.cards = this.getCardsWithLoadingMicroTask(incoming);
        if(this.cards.length > 0){
          this.generalCards = this.getGeneralAmountCardsMicroTask(this.cards);
        }
      }
    });
  }

  activeCardListener($activeCardIndex: number){
    this.activeCardIndex.set($activeCardIndex);
    this.loader.changeState(LoaderActionEnum.GOALS, true);
    this.getGoalsByCard();
  }

  getGoalsByCard(): void{
    this.goalFacade.getGoals.pipe(
      takeUntil(this.unsubscribe$ || this.goals.length > 0),
      map((incoming) => {
        if(!this.cards[this.activeCardIndex()]) {
          this.loader.changeState(LoaderActionEnum.GOALS, false);
          return [];
        };

        if(incoming[this.cards[this.activeCardIndex()].id]){
          this.goals = this.getCardGoalsWithLoadingMicroTask(incoming[this.cards[this.activeCardIndex()].id]);
        } else {
          this.goalFacade.actions.getGoalsByCardId(this.cards[this.activeCardIndex()].id);
        }
        return incoming
      })
    ).subscribe();
  }

  activeGoalEventListener($event: number){
    this.activeGoalIndex.set($event);
    this.getTransactionsByGoal();

  }

  getTransactionsByGoal(): void{
    
    const DASHBOARD_INITIAL_TRANSACTIONS_PAGE = 1;

    this.loader.changeState(LoaderActionEnum.TRANSACTIONS, true);
    this.transactionFacade.getTransactions.pipe(
      takeUntil(this.unsubscribe$ || (this.transactions.length > 0)),
      map((incoming) => {

        if(!this.goals[this.activeGoalIndex()]) {
          this.loader.changeState(LoaderActionEnum.TRANSACTIONS, false);
          return [];
        };

        if(incoming[DASHBOARD_INITIAL_TRANSACTIONS_PAGE] && incoming[DASHBOARD_INITIAL_TRANSACTIONS_PAGE][this.goals[this.activeGoalIndex()].id]){
          this.transactions = this.getTransactionsWithLoadingMicroTask(incoming[DASHBOARD_INITIAL_TRANSACTIONS_PAGE][this.goals[this.activeGoalIndex()].id]);
        } else {
          this.transactionFacade.actions.getTransactionsByGoalId(this.goals[this.activeGoalIndex()].id, DASHBOARD_INITIAL_TRANSACTIONS_PAGE);
        }
        
        return incoming;
      })
    ).subscribe();
  }
}