import { Component, OnInit, inject, signal } from '@angular/core';
import { DashboardMicroTasks } from '@core/classes/pages/dashboard-micro-tasks.class';
import { Store } from '@core/data/store/store.data';
import { IconEnum } from '@core/enums/icon.enum';
import { LoaderActionEnum } from '@core/enums/loader/loader.enum';
import { ICard } from '@core/models/entities/cards.model';
import { ICurrency } from '@core/models/entities/currencies.model';
import { AuthService } from '@core/services/auth/auth.service';
import { takeUntil } from 'rxjs';

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
  cards: ICard[] = [];
  generalCards: ICard[] = [];
  activeCardIndex = signal(0);

  ngOnInit(): void {
    this.loader.changeState(LoaderActionEnum.CARDS, true)
    this.store.get().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (incoming) => {
        this.cards = this.getCardsMicroTask(incoming.cards);
        if(this.cards.length > 0){
          this.generalCards = this.getGeneralAmountCardsMicroTask(this.cards);
        }
      }
    });
  }

  activeIndexEventListener($event: number){
    this.activeCardIndex.set($event);
  } 

  signOut(){
    this.authService.SignOut();
  }
}