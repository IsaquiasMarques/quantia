import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/containers/account.component';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { CardComponent } from './components/views/cards/container/card/card.component';
import { GoalComponent } from './components/views/goals/container/goal/goal.component';
import { CreateCardComponent } from './components/views/cards/views/create/create-card.component';
import { MyCardsComponent } from './components/views/cards/views/index/my-cards.component';
import { EditCardComponent } from './components/views/cards/views/edit/edit-card.component';

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
            path: 'edit',
            title: 'Editar cartão',
            component: EditCardComponent,
          },
        ]
      },
      // {
      //   path: 'goals',
      //   component: GoalComponent,
      //   children: [
      //     {
      //       path: '',
      //       redirectTo: '/account/goals/index',
      //       pathMatch: 'full',
      //     },
      //     {
      //       path: 'index',
      //       title: 'Minhas metas',
      //       component: GoalIndexComponent,
      //     },
      //     {
      //       path: 'create',
      //       title: 'Adicionar cartão',
      //       component: GoalCreateComponent,
      //     },
      //     {
      //       path: 'edit',
      //       title: 'Editar cartão',
      //       component: GoalEditComponent,
      //     },
      //   ]
      // },
      // {
      //   path: 'transactions',
      //   redirectTo: '/account/transactions/index',
      //   pathMatch: 'full',
      //   children: [
      //     {
      //       path: 'index',
      //       title: 'Minhas transações',
      //       component: TransactionIndexComponent,
      //     },
      //     {
      //       path: 'create',
      //       title: 'Adicionar transação',
      //       component: TransactionCreateComponent,
      //     },
      //     {
      //       path: 'edit',
      //       title: 'Editar transação',
      //       component: TransactionEditComponent,
      //     },
      //   ]
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
