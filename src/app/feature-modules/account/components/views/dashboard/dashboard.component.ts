import { Component, OnInit, inject } from '@angular/core';
import { DashboardMicroTasks } from '@core/classes/pages/dashboard-micro-tasks.class';
import { Store } from '@core/data/store/store.data';
import { LoaderActionEnum } from '@core/enums/loader/loader.enum';
import { ICard } from '@core/models/entities/cards.model';
import { AuthService } from '@core/services/auth/auth.service';

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

  ngOnInit(): void {
    this.loader.changeState(LoaderActionEnum.CARDS, true)
    this.store.get().subscribe({
      next: (incoming) => {
        this.cards = this.getCardsMicroTask(incoming.cards);
      }
    });
  }

  signOut(){
    this.authService.SignOut();
  }
}
