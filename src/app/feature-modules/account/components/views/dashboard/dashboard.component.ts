import { Component, OnInit, inject, signal } from '@angular/core';
import { DashboardMicroTasks } from '@core/classes/pages/dashboard-micro-tasks.class';
import { Actions } from '@core/data/actions/actions.data';
import { Store } from '@core/data/store/store.data';
import { IconEnum } from '@core/enums/icon.enum';
import { LoaderActionEnum } from '@core/enums/loader/loader.enum';
import { ICard } from '@core/models/entities/cards.model';
import { ICurrency } from '@core/models/entities/currencies.model';
import { IGoal } from '@core/models/entities/goals.model';
import { AuthService } from '@core/services/auth/auth.service';
import { map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent
extends DashboardMicroTasks
implements OnInit {

  authService = inject(AuthService);
  private store = inject(Store);
  private actions = inject(Actions);

  generalCards: ICard[] = [];
  cards: ICard[] = [];
  goals: IGoal[] = [];

  loaderActionEnum = LoaderActionEnum;

  activeCardIndex = signal(0);
  activeGoalIndex = signal(0);

  ngOnInit(): void {
    this.loader.changeState(LoaderActionEnum.CARDS, true)
    this.store.getByKey('cards').pipe(takeUntil(this.unsubscribe$)).subscribe({
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

    this.store.getByKey('goals').pipe(
      takeUntil(this.unsubscribe$),
      map((incoming) => {
        if(!this.cards[this.activeCardIndex()]) return;
        // console.log(incoming[this.cards[this.activeCardIndex()].id])
        if(incoming[this.cards[this.activeCardIndex()].id]){
          this.goals = this.getCardGoalsWithLoadingMicroTask(incoming[this.cards[this.activeCardIndex()].id]);
        } else {
          this.actions.getGoalsByCardId(this.cards[this.activeCardIndex()].id);
        }
        return incoming
      })
    ).subscribe();
  }

  activeGoalEventListener($event: number){
    this.activeGoalIndex.set($event);
  }

  signOut(){
    this.authService.SignOut();
  }
}