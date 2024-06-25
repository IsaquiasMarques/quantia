import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/containers/account.component';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
