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
import { MyGoalsComponent } from './components/views/goals/views/index/my-goals.component';
import { CreateGoalComponent } from './components/views/goals/views/create/create-goal.component';
import { EditGoalComponent } from './components/views/goals/views/edit/edit-goal.component';
import { EditTransactionComponent } from './components/views/transactions/views/edit/edit-transaction.component';
import { CreateTransactionComponent } from './components/views/transactions/views/create/create-transaction.component';
import { MyTransactionsComponent } from './components/views/transactions/views/index/my-transactions.component';
import { TransactionComponent } from './components/views/transactions/containers/transaction/transaction.component';

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
    MyGoalsComponent,
    CreateGoalComponent,
    EditGoalComponent,
    EditTransactionComponent,
    CreateTransactionComponent,
    MyTransactionsComponent,
    TransactionComponent,
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
