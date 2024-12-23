import { NgModule } from '@angular/core';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './components/containers/account.component';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { HeaderComponent } from './partials/header/header.component';
import { SharedModule } from '@shared/shared.module';
import { TipsComponent } from '@shared/components/singleton/tips/tips.component';
import { TransactionsComponent } from '@shared/components/views/transactions/transactions.component';
import { CardComponent } from './components/views/cards/container/card/card.component';
import { GoalComponent } from './components/views/goals/container/goal/goal.component';
import { MyCardsComponent } from './components/views/cards/views/index/my-cards.component';
import { CreateCardComponent } from './components/views/cards/views/create/create-card.component';
import { EditCardComponent } from './components/views/cards/views/edit/edit-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AccountComponent,
    DashboardComponent,
    HeaderComponent,
    CardComponent,
    MyCardsComponent,
    CreateCardComponent,
    EditCardComponent,
    GoalComponent,
  ],
  imports: [
    SharedModule,
    TipsComponent,
    AccountRoutingModule,
    TransactionsComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
