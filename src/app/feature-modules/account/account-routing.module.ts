import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/containers/account.component';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { CardComponent } from './components/views/cards/container/card/card.component';
import { GoalComponent } from './components/views/goals/container/goal/goal.component';
import { CreateCardComponent } from './components/views/cards/views/create/create-card.component';
import { MyCardsComponent } from './components/views/cards/views/index/my-cards.component';
import { EditCardComponent } from './components/views/cards/views/edit/edit-card.component';
import { MyGoalsComponent } from './components/views/goals/views/index/my-goals.component';
import { CreateGoalComponent } from './components/views/goals/views/create/create-goal.component';
import { EditGoalComponent } from './components/views/goals/views/edit/edit-goal.component';
import { TransactionComponent } from './components/views/transactions/containers/transaction/transaction.component';
import { MyTransactionsComponent } from './components/views/transactions/views/my-transactions/my-transactions.component';
import { CreateTransactionComponent } from './components/views/transactions/views/create-transaction/create-transaction.component';
import { EditTransactionComponent } from './components/views/transactions/views/edit-transaction/edit-transaction.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        redirectTo: '/account/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        title: 'Página inicial',
        component: DashboardComponent
      },
      {
        path: 'cards',
        component: CardComponent,
        children: [
          {
            path: '',
            redirectTo: '/account/cards/index',
            pathMatch: 'full'
          },
          {
            path: 'index',
            title: 'Meus cartões',
            component: MyCardsComponent,
          },
          {
            path: 'create',
            title: 'Adicionar cartão',
            component: CreateCardComponent,
          },
          {
            path: 'edit/:id',
            title: 'Editar cartão',
            component: EditCardComponent,
          },
        ]
      },
      {
        path: 'goals',
        component: GoalComponent,
        children: [
          {
            path: '',
            redirectTo: '/account/goals/index',
            pathMatch: 'full',
          },
          {
            path: 'index',
            title: 'Minhas metas',
            component: MyGoalsComponent,
          },
          {
            path: 'create',
            title: 'Adicionar cartão',
            component: CreateGoalComponent,
          },
          {
            path: 'edit',
            title: 'Editar cartão',
            component: EditGoalComponent,
          },
        ]
      },
      {
        path: 'transactions',
        component: TransactionComponent,
        children: [
          {
            path: '',
            redirectTo: '/account/transactions/index',
            pathMatch: 'full'
          },
          {
            path: 'index',
            title: 'Minhas transações',
            component: MyTransactionsComponent,
          },
          {
            path: 'create',
            title: 'Adicionar transação',
            component: CreateTransactionComponent,
          },
          {
            path: 'edit',
            title: 'Editar transação',
            component: EditTransactionComponent,
          },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
